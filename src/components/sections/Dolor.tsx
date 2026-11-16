import { Container } from "@/components/layout/Container";
import { Bloque } from "@/components/layout/Bloque";
import { Encabezado } from "@/components/ui/Encabezado";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Percent, MessageCircleWarning, Calculator } from "lucide-react";

const dolores = [
  {
    icon: Percent,
    texto: "Cada pedido por app te cuesta hasta 30 % de comisión, aunque ese cliente ya te conocía.",
  },
  {
    icon: MessageCircleWarning,
    texto: "En hora punta el WhatsApp se llena y los pedidos se enfrían sin respuesta.",
  },
  {
    icon: Calculator,
    texto: "Al cierre cuadras Yape, Plin y boletas a mano.",
  },
];

export function Dolor() {
  return (
    <Bloque className="bg-white">
      <Container className="max-w-4xl">
        <Encabezado titulo="¿Te pasa esto?" />
        <ul className="mt-6 grid gap-3 sm:grid-cols-3">
          {dolores.map((d, i) => (
            <AnimatedSection key={d.texto} delay={i * 0.08}>
              <li className="flex h-full items-start gap-3 rounded-2xl border border-accent-100 bg-accent-50/60 p-4 text-[15px] leading-snug text-sand-800">
                <d.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-500" />
                {d.texto}
              </li>
            </AnimatedSection>
          ))}
        </ul>
        <AnimatedSection>
          <p className="mt-5 text-center text-base font-semibold text-sand-800">
            Pedily resuelve las tres cosas con un solo sistema.
          </p>
        </AnimatedSection>
      </Container>
    </Bloque>
  );
}
