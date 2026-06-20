import type {ReactNode} from 'react';

// The real <html>/<body> live in app/[locale]/layout.tsx so the `lang`
// attribute can be locale-aware. This root layout only passes children
// through (required by Next.js because a root not-found page exists).
export default function RootLayout({children}: {children: ReactNode}) {
  return children;
}
