import { Bike, ChefHat, CreditCard, MessageCircle, MonitorSmartphone, QrCode, Receipt, Smartphone, Store, Wallet } from "lucide-react";

const ITEMS = [
  { i: MessageCircle, t: "WhatsApp con IA" },
  { i: Store, t: "Tienda web" },
  { i: MonitorSmartphone, t: "Kiosko" },
  { i: QrCode, t: "QR de mesa" },
  { i: Smartphone, t: "Yape" },
  { i: CreditCard, t: "Tarjeta" },
  { i: Wallet, t: "QR Yape o Plin" },
  { i: Receipt, t: "Boleta SUNAT" },
  { i: ChefHat, t: "Pantalla de cocina" },
  { i: Bike, t: "PedidosYa Envíos" },
];

/** Cinta de canales y pagos: reconocimiento inmediato, sin logos de terceros. */
export function CintaCanales() {
  return (
    <section aria-label="Canales y pagos" className="border-y border-tinta/10 bg-white">
      <ul className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-6 gap-y-3 px-4 py-5 sm:px-6 lg:justify-between lg:px-8">
        {ITEMS.map(({ i: I, t }) => (
          <li key={t} className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.08em] text-sand-700">
            <I aria-hidden className="h-4 w-4 text-chicha-600" />
            {t}
          </li>
        ))}
      </ul>
    </section>
  );
}
