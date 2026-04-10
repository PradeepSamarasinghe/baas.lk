import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import Credentials from "next-auth/providers/credentials"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Credentials({
      name: "Phone OTP",
      credentials: {
        phoneNumber: { label: "Phone Number", type: "text" },
        code: { label: "OTP Code", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.phoneNumber || !credentials?.code) return null

        const phoneNumber = credentials.phoneNumber as string
        const code = credentials.code as string

        // In development, you can skip this by checking a special number
        // but for now we follow the DB record
        
        // Verify OTP from database
        const otpRecord = await db.otpRecord.findFirst({
          where: {
            phoneNumber,
            code,
            expiresAt: { gt: new Date() },
          },
        })

        if (!otpRecord) {
          console.warn(`[AUTH] Invalid or expired OTP for ${phoneNumber}`)
          return null
        }

        // Delete used OTP
        await db.otpRecord.delete({ where: { id: otpRecord.id } })

        // Find or create user
        let user = await db.user.findUnique({
          where: { phoneNumber },
        })

        if (!user) {
          user = await db.user.create({
            data: { 
              phoneNumber,
              // role is null by default, triggering onboarding
            },
          })
          console.log(`[AUTH] New user created: ${phoneNumber}`)
        }

        return {
          id: user.id,
          phoneNumber: user.phoneNumber,
          role: user.role, // may be null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string
        (session.user as any).role = token.role as string
      }
      return session
    },
  },
})
