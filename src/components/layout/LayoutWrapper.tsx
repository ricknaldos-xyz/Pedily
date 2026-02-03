"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDocs = pathname.startsWith("/docs");

  return (
    <>
      <main>{children}</main>
      {!isDocs && <Footer />}
    </>
  );
}
