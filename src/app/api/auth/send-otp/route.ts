import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { sendOtpSms } from "@/lib/sms"

export async function POST(req: NextRequest) {
  try {
    const { phoneNumber } = await req.json()

    if (!phoneNumber) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 })
    }

    // Basic phone number validation (+94...)
    const srLankaFormat = /^\+94\d{9}$/
    if (!srLankaFormat.test(phoneNumber)) {
      return NextResponse.json({ error: "Invalid phone number format. Use: +94771234567" }, { status: 400 })
    }

    // Invalidate existing OTPs for the same number
    await db.otpRecord.deleteMany({
      where: { phoneNumber }
    })

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Set expiration (5 minutes)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000)

    // Store in DB
    await db.otpRecord.create({
      data: {
        phoneNumber,
        code,
        expiresAt,
      },
    })

    // SEND OTP via SMS library
    await sendOtpSms(phoneNumber, code)

    return NextResponse.json({ success: true, message: "OTP sent successfully" })
  } catch (error) {
    console.error("OTP SEND ERROR:", error)
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 })
  }
}
