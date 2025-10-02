# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

- **Framework**: Next.js 15 (App Router) with React 19
- **Authentication**: NextAuth v5 (beta) with Google OAuth and Email providers
- **Database**: MongoDB with Mongoose ODM
- **Payments**: Stripe (Checkout and Customer Portal)
- **Email**: Resend for transactional emails
- **UI**: Tailwind CSS 4 with DaisyUI 5

## Common Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Stripe Testing
```bash
stripe listen --forward-to localhost:3000/api/webhook/stripe  # Test webhooks locally
```

## Project Architecture

### Directory Structure

```
app/
├── api/                    # API routes
│   ├── auth/[...nextauth]/ # NextAuth handler
│   ├── lead/              # Lead capture
│   ├── stripe/            # Stripe checkout & portal
│   └── webhook/stripe/    # Stripe webhook handler
├── blog/                  # Blog pages with SEO
├── dashboard/             # Protected user dashboard
└── (page.js files)        # Public pages

components/                # Reusable UI components
libs/                     # Utility libraries
├── api.js                # Axios client with interceptors
├── auth.js               # NextAuth configuration (server-side)
├── mongoose.js           # MongoDB connection
├── stripe.js             # Stripe utilities
├── resend.js             # Email utilities
└── seo.js                # SEO utilities

models/                   # Mongoose schemas
├── User.js              # User model with Stripe fields
└── plugins/             # Mongoose plugins (toJSON)

config.js                 # Centralized app configuration
middleware.js             # Edge-compatible auth middleware
```

### Key Architectural Patterns

#### NextAuth Configuration Split
- **Server-side** (`libs/auth.js`): Full configuration with EmailProvider, GoogleProvider, and MongoDB adapter
- **Edge middleware** (`middleware.js`): Simplified edge-compatible configuration (JWT only, no MongoDB adapter or EmailProvider)
- This split is necessary because middleware runs in an edge environment which doesn't support some features

#### Import Aliases
- Use `@/` prefix for absolute imports (e.g., `@/config`, `@/libs/auth`, `@/components/Header`)

#### Server vs Client Components
- Default to Server Components (no `"use client"` directive)
- Use `"use client"` only when needed: interactivity, hooks, browser APIs
- API calls from client components use `apiClient` from `@/libs/api.js`

### Authentication Flow

1. NextAuth session management via `auth()` from `@/libs/auth`
2. Get user session: `const session = await auth()`
3. Access user ID: `session?.user?.id`
4. Protected routes redirect to `config.auth.loginUrl` when unauthorized
5. API routes check auth and return 401 if needed
6. `apiClient` interceptor auto-redirects on 401

### Stripe Integration

1. **Checkout**: Use `createCheckout()` from `@/libs/stripe`
2. **Webhook**: Stripe events handled in `app/api/webhook/stripe/route.js`
3. **User Model**: Stores `customerId`, `priceId`, and `hasAccess` boolean
4. **Plans**: Defined in `config.stripe.plans` with `priceId` (different for dev/prod)
5. **Customer Portal**: Use `createCustomerPortal()` for subscription management

### Database Patterns

1. Always call `connectMongo()` before DB operations
2. Schemas use timestamps and toJSON plugin
3. User model has Stripe-specific fields: `customerId`, `priceId`, `hasAccess`
4. Mongoose plugin `toJSON` cleans up API responses

### API Route Structure

```javascript
import { NextResponse } from "next/server";
import { auth } from "@/libs/auth";

export async function POST(req) {
  try {
    const session = await auth();
    const body = await req.json();

    // Validation
    if (!body.requiredField) {
      return NextResponse.json(
        { error: "Required field is missing" },
        { status: 400 }
      );
    }

    // Logic here

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
```

### Client-Side API Calls

```javascript
"use client";
import { useState } from "react";
import apiClient from "@/libs/api";

const Component = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.post("/endpoint", data);
      // Success handling
    } catch (error) {
      // Error automatically shown via toast by apiClient interceptor
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className="btn btn-primary"
      onClick={handleAction}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : "Action"}
    </button>
  );
};
```

## Naming Conventions

- **Components**: PascalCase (e.g., `ButtonCheckout.js`, `HeaderBlog.js`)
- **API Routes**: kebab-case directories with `route.js` files
- **Utilities**: camelCase (e.g., `connectMongo`, `createCheckout`)
- **Constants**: UPPER_SNAKE_CASE
- **Variables**: camelCase

## Environment Variables

Required in `.env.local`:
- `NEXTAUTH_SECRET` - Random string for NextAuth
- `NEXTAUTH_URL` - App URL (e.g., http://localhost:3000)
- `AUTH_TRUST_HOST` - Set to `true` for NextAuth v5
- `MONGODB_URI` - MongoDB connection string
- `STRIPE_PUBLIC_KEY` - Stripe publishable key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret
- `GOOGLE_ID` - (Optional) Google OAuth client ID
- `GOOGLE_SECRET` - (Optional) Google OAuth client secret
- `RESEND_API_KEY` - Resend API key for emails

## Configuration (`config.js`)

Centralized configuration for:
- App metadata (`appName`, `appDescription`, `domainName`)
- Stripe plans with `priceId`, name, features (use dev/prod price IDs)
- Resend email settings (`fromNoReply`, `fromAdmin`, `supportEmail`)
- DaisyUI theme settings
- Auth routes (`loginUrl`, `callbackUrl`)

Access via: `import config from "@/config"`

## Important Notes

- **Webpack Configuration**: Ignores MongoDB optional dependencies to prevent build warnings
- **Image Optimization**: Whitelist image domains in `next.config.js` under `remotePatterns`
- **Error Handling**: All API routes use try-catch with appropriate HTTP status codes
- **Security**: Validate all inputs in API routes, sanitize before DB operations
- **SEO**: Use `getSEOTags()` from `@/libs/seo` to set metadata
- **Client Layout**: `LayoutClient.js` wraps client-side providers (Crisp, toast, tooltips)
