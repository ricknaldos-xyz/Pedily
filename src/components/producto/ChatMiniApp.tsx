import { Captura } from "@/components/marca/Captura";
import { Sello } from "@/components/marca/Sello";
import { ChatWhatsApp } from "./Chat";
import { SecuenciaPasos, type PasoSecuencia } from "./SecuenciaPasos";

/**
 * «Chat para conversar, mini-app para comprar» (decisión del dueño, 16-nov;
 * `pedily-backend/src/bot/ai/prompt/core-prompt.ts:69-71`).
 *
 * Secuencia en un celular: chat → «Ver carta» → mini-app → pago → «PAGADO /
 * EN COCINA».
 * - El chat es una RECREACIÓN con textos reales del asistente: el botón
 *   «Ver carta» (`B/src/bot/copy/copy-voice.ts:210`), la invitación de
 *   `open_webview` (`core-prompt.ts:71`), el carrito («¡Listo! Ya agregué…»,
 *   clip LV2-C) y la confirmación (`B/src/bot/bot.service.ts:11317` +
 *   `B/src/order/status-notice-lean.ts:25-26`).
 * - Las pantallas de la mini-app son capturas reales de `pedily-web/app/wa/**`
 *   con la carta de la demo (LV2-C, `webview-01/04/07`). Los precios cuadran
 *   con ellas: pollo entero S/ 62 + chicha 1 L S/ 11 = S/ 73.
 */

const NOTA_CHAT = "Chat: recreación con textos reales del asistente";
const NOTA_APP = "Mini-app real · datos de la demo";
const P = "(max-width: 640px) 76vw, 304px";

export function SecuenciaChatMiniApp({ oscuro = false }: { oscuro?: boolean }) {
  const pasos: PasoSecuencia[] = [
    {
      corto: "Escribe",
      titulo: "Escribe en el chat",
      texto: "Pide como habla. El asistente arma el pedido y le abre la carta con un botón.",
      nota: NOTA_CHAT,
      pantalla: (
        <ChatWhatsApp
          className="h-full"
          mensajes={[
            { de: "cliente", texto: "hola! un pollo entero con ají y ocopa 🙏", hora: "20:41" },
            {
              de: "bot",
              texto: "¡Listo! Ya agregué Pollo entero a la brasa a tu pedido.\nExtras: Ají de la casa, Ocopa\nTu carrito va en S/ 62.00 (1 producto)",
              hora: "20:41",
            },
            { de: "cliente", texto: "y algo de tomar?", hora: "20:42" },
            {
              de: "bot",
              texto: "Te abro la carta para que armes y pagues fácil y seguro 👇",
              hora: "20:42",
              boton: "Ver carta",
            },
          ]}
        />
      ),
    },
    {
      corto: "Carta",
      titulo: "Se abre la mini-app",
      texto: "Dentro de WhatsApp, con tu marca y sin descargar nada: tu carta con fotos.",
      nota: NOTA_APP,
      pantalla: <Captura clave="wa-carta" sizes={P} decorativa />,
    },
    {
      corto: "Toca",
      titulo: "Termina tocando",
      texto: "El pollo que pidió por chat ya está en el carrito; la chicha la suma con un toque.",
      nota: NOTA_APP,
      pantalla: <Captura clave="wa-carrito" sizes={P} decorativa />,
    },
    {
      corto: "Paga",
      titulo: "Elige entrega y paga",
      texto: "Delivery o recojo, ahora o para más tarde, y paga con Yape, tarjeta o tu QR de Yape o Plin.",
      nota: NOTA_APP,
      pantalla: <Captura clave="wa-pago" sizes={P} decorativa />,
    },
    {
      corto: "Cocina",
      titulo: "Pagado y en cocina",
      texto: "El chat le confirma el pedido y la comanda entra a cocina con alarma.",
      nota: NOTA_CHAT,
      pantalla: (
        <ChatWhatsApp
          className="h-full"
          mensajes={[
            { de: "bot", texto: "Te abro la carta para que armes y pagues fácil y seguro 👇", hora: "20:42", boton: "Ver carta" },
            {
              de: "bot",
              texto: "✅ ¡Tu pedido #RD001464 ya está confirmado!\nTotal: S/ 73.00\nTe volvemos a escribir cuando salga a reparto o esté listo para recoger.",
              hora: "20:44",
            },
            { de: "cliente", texto: "graciaas 🙌", hora: "20:44" },
          ]}
        />
      ),
      extra: (
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-3">
          <Sello tono="pagado" giro={-8} animado className="!text-base">
            Pagado · S/ 73
          </Sello>
          <Sello tono="cocina" giro={5} animado retraso={450} className="!text-base">
            En cocina
          </Sello>
        </div>
      ),
    },
  ];
  return <SecuenciaPasos pasos={pasos} oscuro={oscuro} etiqueta="Un pedido de punta a punta: del chat a la mini-app y a cocina" />;
}
