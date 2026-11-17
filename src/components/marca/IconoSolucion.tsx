import {
  BarChart3,
  Bike,
  CalendarClock,
  ChefHat,
  MessageCircle,
  MonitorSmartphone,
  Package,
  Plug,
  QrCode,
  Receipt,
  Store,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { Icono } from "@/lib/soluciones";

export const ICONOS: Record<Icono, LucideIcon> = {
  chat: MessageCircle,
  tienda: Store,
  kiosko: MonitorSmartphone,
  qr: QrCode,
  reloj: CalendarClock,
  cocina: ChefHat,
  caja: Wallet,
  boleta: Receipt,
  moto: Bike,
  almacen: Package,
  clientes: Users,
  reportes: BarChart3,
  enchufe: Plug,
};

export function IconoSolucion({ icono, className }: { icono: Icono; className?: string }) {
  const I = ICONOS[icono];
  return <I aria-hidden className={className} />;
}
