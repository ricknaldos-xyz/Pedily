import { Footer } from "./Footer";
import { BarraMovil } from "./BarraMovil";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main id="contenido">{children}</main>
      <Footer />
      <BarraMovil />
    </>
  );
}
