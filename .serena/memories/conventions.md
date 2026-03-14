# Conventions

## Structure
- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components (likely using Radix/Shadcn).
- `hooks/`: Custom React hooks.
- `lib/`: Utility functions and library configurations.
- `services/`: API and third-party service abstractions (e.g., Supabase, AI).
- `supabase/`: Database configurations and migrations.
- `types/`: TypeScript type definitions.
- `public/`: Static assets.

## Styling
- Uses Tailwind CSS v4.
- Branding colors are defined via CSS Custom Properties (`--primary: #1A56DB`, etc.).
- Sora for headings, DM Sans for body.

## Code Style
- TypeScript for type safety.
- ESLint for linting.
- Prettier/standard formatting (likely inherited from Next.js defaults).
