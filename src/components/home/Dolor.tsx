import { ArrowDown } from "lucide-react";
import { Encabezado } from "@/components/ui/Encabezado";

const DOLORES = [
  {
    antes: "Cada pedido por app te cuesta hasta 30 % de comisión, aunque ese cliente ya te conocía.",
    con: "Tu web y tu WhatsApp venden con 0 % de comisión, y el cliente queda en tu base.",
  },
  {
    antes: "En hora punta el WhatsApp se llena y los pedidos se enfrían sin respuesta.",
    con: "El asistente atiende todos los chats a la vez y te pasa los que piden una persona.",
  },
  {
    antes: "Al cierre cuadras Yape, Plin y boletas a mano.",
    con: "La boleta sale sola y el cierre del día compara lo vendido con lo cobrado.",
  },
  {
    antes: "No sabes cuánto te cuesta cada plato ni qué se va a acabar.",
    con: "Recetas con costo, stock que baja con cada venta y «Agotado» automático.",
  },
];

export function Dolor() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Encabezado etiqueta="¿Te pasa esto?" titulo="Lo que se te va entre comisiones, chats y cuadres" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DOLORES.map((d) => (
            <li key={d.antes} className="flex flex-col overflow-hidden rounded-2xl border border-tinta/10 bg-white">
              <p className="flex-1 p-5 text-[1rem] leading-snug text-sand-800">
                <span className="mb-2 block font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-rocoto-500">Hoy</span>
                {d.antes}
              </p>
              <div className="relative border-t border-dashed border-tinta/20 bg-hierba-50 p-5">
                <ArrowDown aria-hidden className="absolute -top-3 left-5 h-6 w-6 rounded-full border border-tinta/10 bg-white p-1 text-hierba-600" />
                <p className="text-[1rem] font-semibold leading-snug text-tinta">
                  <span className="mb-2 block font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-hierba-700">Con Pedily</span>
                  {d.con}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
