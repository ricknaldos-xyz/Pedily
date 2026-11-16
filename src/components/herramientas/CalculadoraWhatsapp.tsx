"use client";

import { useState } from "react";
import { CampoNumero, Resultado, Tarjeta } from "./campos";
import { soles } from "@/lib/planes";
import { META } from "@/lib/herramientas";

/** Cálculo puro con las tarifas de Meta para Perú (src/lib/herramientas.ts). */
export function calcularMeta(e: {
  conversaciones: number;
  respuestas: number;
  pedidos: number;
  avisos: number;
  marketing: number;
}) {
  const servicio = e.conversaciones * e.respuestas;
  const servicioPagado = Math.max(0, servicio - META.servicioGratisMes);
  const costoServicio = servicioPagado * META.servicio;
  const utilidad = e.pedidos * e.avisos;
  const costoUtilidad = utilidad * META.utilidad;
  const costoMarketing = e.marketing * META.marketing;
  const total = costoServicio + costoUtilidad + costoMarketing;
  return {
    servicio,
    servicioPagado,
    costoServicio,
    utilidad,
    costoUtilidad,
    costoMarketing,
    total,
    porPedido: e.pedidos > 0 ? total / e.pedidos : 0,
    conversacionesGratis: e.respuestas > 0 ? Math.floor(META.servicioGratisMes / e.respuestas) : null,
  };
}

const fmt = (n: number) => n.toLocaleString("es-PE").replace(/,/g, ".");

export function CalculadoraWhatsapp() {
  const [conversaciones, setConversaciones] = useState(400);
  const [respuestas, setRespuestas] = useState(6);
  const [pedidos, setPedidos] = useState(300);
  const [avisos, setAvisos] = useState(1);
  const [marketing, setMarketing] = useState(0);

  const r = calcularMeta({ conversaciones, respuestas, pedidos, avisos, marketing });

  return (
    <Tarjeta>
      <div className="grid gap-4 sm:grid-cols-2">
        <CampoNumero
          etiqueta="Conversaciones al mes"
          ayuda="Clientes que te escriben (pidan o no)."
          valor={conversaciones}
          onChange={setConversaciones}
          max={1000000}
          paso={10}
        />
        <CampoNumero
          etiqueta="Respuestas tuyas por conversación"
          ayuda="Un formulario gasta 1; una conversación, varias."
          valor={respuestas}
          onChange={setRespuestas}
          max={100}
        />
        <CampoNumero
          etiqueta="Pedidos por WhatsApp al mes"
          valor={pedidos}
          onChange={setPedidos}
          max={1000000}
          paso={10}
        />
        <CampoNumero
          etiqueta="Avisos con plantilla por pedido"
          ayuda="Por ejemplo, «tu pedido salió». 0 si no mandas avisos."
          valor={avisos}
          onChange={setAvisos}
          max={20}
        />
        <CampoNumero
          etiqueta="Mensajes de campaña al mes"
          ayuda="Promociones a clientes que te dieron permiso."
          valor={marketing}
          onChange={setMarketing}
          max={1000000}
          paso={50}
        />
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-2 sm:gap-3" aria-live="polite">
        <Resultado
          etiqueta="Pagarías a Meta al mes"
          valor={soles(r.total, 2)}
          tono={r.total > 0 ? "malo" : "bueno"}
          detalle={pedidos > 0 ? `${soles(r.porPedido, 2)} por pedido` : undefined}
        />
        <Resultado
          etiqueta="Conversaciones que caben en los 1.000 gratis"
          valor={r.conversacionesGratis === null ? "—" : fmt(r.conversacionesGratis)}
          tono="neutro"
          detalle={`Con ${respuestas} respuestas cada una`}
        />
      </dl>

      <ul className="mt-4 divide-y divide-dashed divide-tinta/15 rounded-xl border-2 border-tinta/10 text-sm">
        <li className="flex justify-between gap-3 px-3 py-2">
          <span className="text-sand-700">
            Servicio: {fmt(r.servicio)} respuestas, {fmt(r.servicioPagado)} pagadas
          </span>
          <span className="font-mono font-semibold text-tinta">{soles(r.costoServicio, 2)}</span>
        </li>
        <li className="flex justify-between gap-3 px-3 py-2">
          <span className="text-sand-700">Utilidad: {fmt(r.utilidad)} avisos</span>
          <span className="font-mono font-semibold text-tinta">{soles(r.costoUtilidad, 2)}</span>
        </li>
        <li className="flex justify-between gap-3 px-3 py-2">
          <span className="text-sand-700">Marketing: {fmt(marketing)} mensajes</span>
          <span className="font-mono font-semibold text-tinta">{soles(r.costoMarketing, 2)}</span>
        </li>
      </ul>
      <p className="mt-3 text-xs leading-relaxed text-sand-700">
        Tarifas de Meta para Perú en soles, sin impuestos:{" "}
        {soles(META.servicio, 4)} servicio y utilidad, {soles(META.marketing, 4)}{" "}
        marketing. Es para la plataforma de WhatsApp
        Business (la API); la app WhatsApp Business no cobra por mensaje.
      </p>
    </Tarjeta>
  );
}
