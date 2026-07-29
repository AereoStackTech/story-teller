# Comprehensive Enterprise Full-Stack Platform (Next.js 15 Monolith Architecture)

## 1. Project Overview

A production-ready, highly secure, and feature-complete enterprise web platform built with Next.js 15 App Router. It combines a dynamic, responsive client portal, authentication routes, and an administrative management dashboard with an integrated backend API layer, Prisma ORM, and advanced styling utilizing Tailwind CSS and shadcn/ui components.

## 2. Tech Stack & Architecture

- **Framework & Runtime:** Next.js 15 (App Router, Server Actions, Server Components, TypeScript)
- **Styling & UI Components:** Tailwind CSS, shadcn/ui primitives, Lucide React Icons
- **Database & ORM:** PostgreSQL via Prisma ORM
- **Validation & Forms:** Zod & React Hook Form
- **Security & Authentication:** NextAuth.js / Auth.js, bcrypt, role-based access control (RBAC)

## 3. Directory Structure

/
├── app/                      # Next.js 15 App Router Architecture
│   ├── (auth)/               # Login, registration, and password recovery routes
│   ├── (customer)/           # Customer portal, catalog, interactive flows, and user dashboard
│   ├── (admin)/              # Comprehensive administrative dashboard, management panels, and analytics
│   ├── api/                  # Backend API routes (REST endpoints, webhooks, business logic)
│   ├── layout.tsx            # Root layout with Tailwind CSS & dynamic theme providers
│   └── page.tsx              # Dynamic, domain-tailored high-end landing page
├── components/               # Shared and domain-specific components
│   ├── ui/                   # shadcn/ui primitives (Buttons, Dialogs, Cards, Calendars, etc.)
│   ├── features/             # Feature-specific interactive flows and business components
│   └── shared/               # Navigation headers, footers, interactive layouts, and cards
├── lib/                      # Utilities, database connection, and core business helpers
│   ├── prisma.ts             # Global Prisma client instance
│   ├── validations.ts        # Zod validation schemas for forms and API payloads
│   └── business-logic.ts     # Core domain calculations, pricing, and service helpers
├── prisma/                   # Database Schema and Migrations
│   └── schema.prisma         # Enterprise database models and relations
├── public/                   # Static assets, branding graphics, and media placeholders
├── .cursorrules              # AI coding guidelines and architectural rules
└── package.json              # Workspace scripts, dependencies, and project metadata

## 4. Core Setup Steps

1. Clone the repository and install dependencies: `npm install`
2. Configure environment variables in `.env` (`DATABASE_URL`, `NEXTAUTH_SECRET`, API keys).
3. Execute database migrations and generate Prisma client: `npx prisma migrate dev`
4. Start the local development environment: `npm run dev` (Runs on `http://localhost:3000`)
