import { Boton } from "@/components/marca/Boton";
import { Sello } from "@/components/marca/Sello";
import { Corte, FilaTicket, Ticket } from "@/components/marca/Ticket";

export default function NotFound() {
  return (
    <section className="papel-trama py-16 sm:py-24">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 sm:px-6 md:grid-cols-[1fr_18rem]">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-chicha-700">Error 404</p>
          <h1 className="mt-3 font-display text-[2.4rem] font-extrabold leading-[1.02] tracking-[-0.03em] text-tinta text-balance sm:text-6xl">
            Este pedido no está en la carta
          </h1>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-sand-700">
            La página que buscas no existe o cambió de dirección. Vuelve al inicio o mira todo lo que hace Pedily.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Boton href="/" flecha>
              Ir al inicio
            </Boton>
            <Boton href="/soluciones" variante="borde">
              Ver las soluciones
            </Boton>
          </div>
        </div>
        <Ticket className="mx-auto w-full max-w-[16rem] rotate-2">
          <p className="text-center font-mono text-[11px] uppercase tracking-wider text-humo">Comanda #404</p>
          <Corte />
          <FilaTicket concepto="Página buscada" monto="1" />
          <FilaTicket concepto="Encontradas" monto="0" fuerte />
          <Corte />
          <Sello tono="agotado" giro={-6}>
            Agotado
          </Sello>
        </Ticket>
      </div>
    </section>
  );
}
