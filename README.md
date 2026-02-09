# SaasPilot - Next.js SaaS Boilerplate

A modern, production-ready Next.js 15 boilerplate for building SaaS applications with React 19, TypeScript, Tailwind CSS v4, and shadcn/ui.

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/) with strict type checking
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with shadcn/ui components
- **Forms:** [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Database:** [Prisma ORM](https://www.prisma.io/)
- **Authentication:** Built-in auth system with secure session management
- **Deployment:** Optimized for [Vercel](https://vercel.com/)

## Features

- 🚀 **Modern Stack**: Next.js 15, React 19, TypeScript
- 🎨 **Beautiful UI**: Tailwind CSS v4 with shadcn/ui components
- 📱 **Responsive**: Mobile-first design approach
- 🔒 **Type Safety**: Full TypeScript support
- 📝 **Form Handling**: React Hook Form with Zod validation
- 🔍 **SEO Optimized**: Built-in SEO best practices
- 🏎️ **Performance**: Optimized for Core Web Vitals
- 🔐 **Authentication**: Secure authentication system
- 📊 **Database**: Prisma ORM for database operations
- 🧩 **Component Library**: Reusable UI components

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm (comes with Node.js)

### Installation

1. In your terminal, run the following commands one-by-one:

```bash title="Terminal"
npm install
npm run dev
```

> **Note:** SaasPilot requires Node 20 or greater. Type `node -v` in your terminal to check your version.

1. Rename `.env.example` to `.env`:

```bash title="Terminal"
mv .env.example .env
```

1. Open [http://localhost:3000](http://localhost:3000) to see your site.

## Project Structure

```
├── actions/             # Server Actions for data mutations
├── app/                 # App Router pages and layouts
│   ├── api/             # API routes
│   ├── (auth)/          # Authentication pages
│   ├── (dashboard)/     # Dashboard pages
│   ├── (marketing)/     # Marketing pages
├── components/          # React components
│   ├── forms/           # Form components
│   ├── sections/        # Page sections
│   ├── ui/              # UI components (shadcn/ui)
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and shared logic
│   ├── prisma.ts        # Prisma client
│   ├── seo/             # SEO utilities
│   ├── schemas.ts       # Zod validation schemas
├── prisma/              # Prisma schema and migrations
├── public/              # Static assets
├── types/               # TypeScript type definitions
```

## Development Guidelines

### Components

- Use React Server Components (RSCs) by default
- Only use Client Components (`"use client"`) when necessary
- Create reusable components in appropriate directories

### Styling

- Use Tailwind CSS v4 for styling
- Use CSS variables for theme colors defined in `app/globals.css`

### Forms

- Use React Hook Form for form state management
- Define validation logic using Zod schemas in `lib/zod-schemas.ts`
- Implement both client-side and server-side validation

### Database

- Use Prisma for database access via `lib/prisma.ts`
- Maintain the Prisma schema in `prisma/schema.prisma`
- Use Prisma migrations for database schema changes

### SEO

- Add new static pages to `app/sitemap.ts`
- Use `createMetadata` function from `lib/metadata.ts`
- Optimize Core Web Vitals (LCP, CLS, FID)
- Use Next.js Image component for image optimization

## Adding shadcn/ui Components

To add a new shadcn/ui component:

```bash
npx shadcn@latest add <component-name>
```

Always check if the component already exists in `components/ui/` before adding.

## Deployment

The project is optimized for deployment on Vercel:

```bash
npm run build
```
