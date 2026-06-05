import { FileCheck, MapPin, Ban, Users } from "lucide-react";

const badges = [
  {
    icon: Ban,
    label: "Sin comisiones por pedido",
  },
  {
    icon: FileCheck,
    label: "Facturación SUNAT",
  },
  {
    icon: Users,
    label: "Tus clientes son tuyos",
  },
  {
    icon: MapPin,
    label: "Soporte en Perú",
  },
];

interface TrustBadgesProps {
  className?: string;
}

export function TrustBadges({ className }: TrustBadgesProps) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-start ${className ?? ""}`}
    >
      {badges.map((badge) => (
        <div
          key={badge.label}
          className="flex items-center gap-1.5 text-xs text-sand-500"
        >
          <badge.icon className="h-3.5 w-3.5 text-sand-400" />
          <span>{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
