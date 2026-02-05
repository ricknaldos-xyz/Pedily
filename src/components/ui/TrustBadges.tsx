import { FileCheck, MapPin, Shield, Zap } from "lucide-react";

const badges = [
  {
    icon: Shield,
    label: "Datos protegidos",
  },
  {
    icon: FileCheck,
    label: "Certificado SUNAT",
  },
  {
    icon: MapPin,
    label: "Soporte en Peru",
  },
  {
    icon: Zap,
    label: "99.9% uptime",
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
          className="flex items-center gap-1.5 text-xs text-slate-500"
        >
          <badge.icon className="h-3.5 w-3.5 text-slate-400" />
          <span>{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
