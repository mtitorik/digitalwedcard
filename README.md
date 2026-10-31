# Invitations Studio — Administrative Backbone & Backend Infrastructure

Production-grade administrative suite and e-commerce backend for a bespoke luxury wedding invitation and stationery platform inspired by `invitationsstudio.com`.

Built with **Next.js 16 (App Router)**, **TypeScript (Strict Mode)**, **Tailwind CSS**, **PostgreSQL**, **Prisma ORM**, and **Jose/Bcrypt RBAC Session Authentication**.

---

## 🏛️ System Architecture

```
├── prisma/
│   ├── schema.prisma          # PostgreSQL models (User, Category, Product, Order, OrderItem, Asset)
│   └── seed.ts                # Production-grade seed data (Admin, Customer, Suites, Orders, Assets)
├── src/
│   ├── actions/               # Type-safe Server Actions with Zod validation
│   │   ├── auth.ts            # Login, register, logout, session check
│   │   ├── products.ts        # Product CRUD, status toggling, slug checks
│   │   ├── orders.ts          # Order listing, status transitions
│   │   ├── categories.ts      # Suite category management
│   │   ├── assets.ts          # Design media registration & deletion
│   │   └── dashboard.ts       # KPI telemetry (revenue, order volume, live designs)
│   ├── app/
│   │   ├── (auth)/            # Auth routes (/login, /register)
│   │   ├── admin/             # Role-protected administrative suite
│   │   │   ├── page.tsx       # KPI overview & recent stationery orders
│   │   │   ├── products/      # Product list, filters & creation form
│   │   │   ├── orders/        # Custom stationery orders & wording review
│   │   │   ├── categories/    # Invitation suite & category organizer
│   │   │   └── assets/        # Media storage & asset library
│   │   ├── unauthorized/      # Friendly RBAC access-denied page
│   │   └── page.tsx           # Storefront home showcasing live catalog
│   ├── components/
│   │   ├── admin/             # Sidebar, Header, Metric Cards, Status Badges
│   │   ├── auth/              # Login & Register forms with 1-click demo credentials
│   │   └── ui/                # Accessible design system (Button, Input, Card, Badge, Textarea)
│   ├── lib/
│   │   ├── auth/              # Jose JWT encryption, HttpOnly cookie & RBAC guards
│   │   ├── validations/       # Shared Zod schemas for client & server
│   │   ├── prisma.ts          # PrismaClient singleton instance
│   │   └── utils.ts           # Currency formatting, date formatting, cn()
│   └── proxy.ts               # Next.js 16 proxy protecting /admin/:path* routes
```

---

## 🔐 Authentication & Role-Based Access Control (RBAC)

1. **Password Security**: Passwords hashed using `bcryptjs` with salt rounds = 10.
2. **Session Storage**: Signed, tamper-proof JSON Web Tokens generated using `jose` (`HS256`), stored inside an `HttpOnly`, `SameSite=lax`, secure cookie (`auth_session`) with 7-day expiration.
3. **Route Protection**: Next.js 16 Proxy (`src/proxy.ts`) enforces strict route-level guarding on `/admin/:path*`.
4. **Data Access Layer Defense**: Every administrative Server Action validates `await requireAdmin()` before mutating data.

### Pre-Configured Demo Accounts (Ready to Test)

| Role | Email | Password | Access Level |
|---|---|---|---|
| **ADMIN** | `admin@invitations.com` | `Admin123456!` | Full studio administrative operations (`/admin`) |
| **CUSTOMER** | `sophia.clark@example.com` | `Customer123456!` | Storefront client access |

> The login page at `/login` provides 1-click **Quick Demo Logins** buttons to auto-populate credentials.

---

## 🗄️ Database & Schema

Powered by PostgreSQL using Prisma ORM with relational mapping:

- **User**: Authentication, avatars, roles (`ADMIN`, `CUSTOMER`).
- **Category**: Invitation categories (`wedding-invitations`, `save-the-dates`, `rsvp-details`, `thank-you-notes`).
- **Product**: Invitation suites with SKU, base price, sale price, inventory, cardstock options (`120lb Premium Matte`, `130lb Linen`, `Double-Thick 240lb Cotton`), and foil options (`Gold Foil`, `Rose Gold`, `Blind Deboss`).
- **Order**: Customer details, total amount, shipping addresses, fulfillment statuses (`PENDING`, `PAID`, `PROCESSING`, `SHIPPED`, `DELIVERED`, `CANCELLED`).
- **OrderItem**: Individual stationery units linked to custom bride/groom names, event dates, and printing specs.
- **Asset**: Media management for flatlay photography and stationery wording guides.

---

## 🚀 Quick Start Commands

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables in .env
DATABASE_URL="postgresql://user:password@localhost:5432/wedding_invitations?schema=public"
JWT_SECRET="your-32-character-secret-key-goes-here"

# 3. Synchronize database schema
npx prisma db push

# 4. Seed initial database records
npm run db:seed

# 5. Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the storefront and [http://localhost:3000/admin](http://localhost:3000/admin) for the Administrative Suite.
