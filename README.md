<div align="center">

# 👷 Baas.lk — Verified Labor Marketplace

A premium, full-stack digital marketplace connecting homeowners and construction SMEs in Sri Lanka with trusted, verified skilled workers (Baas) — featuring multi-level verification, milestone-based job management, and role-aware workflows.

[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white)](https://prisma.io)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Auth.js](https://img.shields.io/badge/Auth.js-v5-FF4444?logo=nextdotjs&logoColor=white)](https://authjs.dev)

</div>

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🔐 **Multi-Level Verification** | Government NIC check, live selfie match, and trade certificate validation |
| 🛡️ **Milestone Management** | Transparent job tracking where payments are released only upon milestone approval |
| 👥 **Dual-Role Ecosystem** | Specialized onboarding and dashboards for both **Customers** and **Workers** |
| 📱 **Phone OTP Auth** | Secure, passwordless authentication tailored for the local Sri Lankan market |
| 💎 **Premium UI/UX** | High-fidelity, minimalist design with smooth animations and glassmorphism |
| 📊 **Professional Discovery** | Verified worker profiles with ratings, reviews, and detailed job history |
| ⚡ **Real-Time Updates** | Instant feedback and status tracking for active project milestones |

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Frontend** | Next.js 15 (App Router), React 19, TypeScript |
| **Styling & UI** | Tailwind CSS v4, Radix UI Primitives, Lucide Icons |
| **Backend & ORM** | Next.js Server Components / Actions, Prisma ORM |
| **Authentication** | Auth.js v5 (formerly NextAuth), SMS OTP Integration |
| **Database** | PostgreSQL |
| **Animations** | Framer Motion |

---

## 📁 Project Structure

```text
baas.lk/
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets (logos, images)
├── src/
│   ├── app/                # Next.js App Router (Pages, Layouts, API)
│   │   ├── (dashboard)/   # Role-based dashboard routes
│   │   ├── onboarding/     # Multi-step registration flow
│   │   └── api/            # Serverless API endpoints
│   ├── components/         # Reusable Component Architecture
│   │   ├── ui/             # Radix-based design system primitives
│   │   └── landing/        # High-fidelity landing page sections
│   ├── hooks/              # Custom React hooks (useAuth, useInView)
│   ├── lib/                # Core business logic & SDK initializations
│   │   ├── db.ts           # Prisma client singleton
│   │   └── sms.ts          # SMS gateway adapter
│   ├── assets/             # Project-specific static resources
│   └── auth.ts             # Auth.js configuration & provider logic
├── tailwind.config.ts      # (Optional) Legacy TW config
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20.x
- **PostgreSQL** (Local or Managed instance)
- **npm** ≥ 10.x

### Installation

```bash
# Clone the repository
git clone https://github.com/PradeepSamarasinghe/baas.lk.git

# Navigate to the project
cd baas.lk

# Install dependencies
npm install
```

### Environment Configuration

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/baas_db"
AUTH_SECRET="your_nextauth_secret"
# Add SMS API / Other provider keys
```

### Database Initialization

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev
```

### Run Locally

```bash
# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`

---

## 📬 Contact

| | |
|---|---|
| 📧 **Email** | [samarasinghepradeep242@gmail.com](mailto:samarasinghepradeep242@gmail.com) |
| 💼 **LinkedIn** | [linkedin.com/in/pradeep-samarasinghe](https://www.linkedin.com/in/pradeep-samarasinghe) |
| 🐙 **GitHub** | [github.com/PradeepSamarasinghe](https://github.com/PradeepSamarasinghe) |
| 📱 **Phone** | +94 77 568 9783 |

---

## 📄 License

This project is proprietary and confidential. © 2026 Baas.lk. All rights reserved.

---

<div align="center">

**Designed & Developed by Pradeep Samarasinghe** ✨

</div>
