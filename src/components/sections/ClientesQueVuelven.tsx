import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Bloque } from "@/components/layout/Bloque";
import { Encabezado } from "@/components/ui/Encabezado";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Ticket, Users, Wallet, RotateCcw } from "lucide-react";

const opciones = [
  { icon: Ticket, texto: "Cupones con vencimiento y límite de usos" },
  { icon: Users, texto: "Referidos: invita a un amigo y ambos ganan" },
  { icon: Wallet, texto: "Saldo a favor para su próximo pedido" },
  { icon: RotateCcw, texto: "Repetir su último pedido en dos toques" },
];

const ademas =
  "caja con cierre, inventario y recetas, meta de ventas del día, reportes por canal y hora, roles para tu equipo y Libro de Reclamaciones.";

export function ClientesQueVuelven() {
  return (
    <Bloque className="bg-sand-50">
      <Container className="max-w-5xl">
        <Encabezado
          etiqueta="Clientes que vuelven"
          titulo="Que el que ya te compró te vuelva a pedir directo"
          bajada={
            <>
              Todo viene apagado. Lo enciendes tú, cuando quieras, desde{" "}
              <strong className="text-sand-800">«Opciones de tu tienda»</strong>, y ves
              qué cambió en tus pedidos.
            </>
          }
        />

        <div className="mt-6 grid items-center gap-5 lg:grid-cols-2">
          <ul className="grid grid-cols-2 gap-2">
            {opciones.map((o, i) => (
              <AnimatedSection key={o.texto} delay={i * 0.05}>
                <li className="flex h-full flex-col gap-1.5 rounded-xl bg-white p-3 text-[13px] leading-snug text-sand-800 shadow-card sm:flex-row sm:items-center sm:gap-3 sm:text-sm">
                  <o.icon className="h-5 w-5 flex-shrink-0 text-primary-600" />
                  {o.texto}
                </li>
              </AnimatedSection>
            ))}
          </ul>
          <AnimatedSection delay={0.1}>
            <figure className="overflow-hidden rounded-xl border border-sand-300 shadow-elevated">
              <Image
                src="/capturas/panel-opciones.webp"
                alt="Pantalla «Opciones de tu tienda» del panel, con saldo de recompensas y referidos apagados"
                width={1000}
                height={655}
                sizes="(max-width: 1024px) 92vw, 500px"
                className="h-auto w-full"
              />
            </figure>
          </AnimatedSection>
        </div>

        <AnimatedSection>
          <p className="mx-auto mt-5 max-w-3xl rounded-2xl border border-sand-200 bg-white p-4 text-sm leading-relaxed text-sand-700">
            <strong className="text-sand-900">Y además, en el mismo panel:</strong> {ademas}
          </p>
        </AnimatedSection>
      </Container>
    </Bloque>
  );
}
