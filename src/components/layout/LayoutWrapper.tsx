"use client";

import { Footer } from "./Footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
}
