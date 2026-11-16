import type { GrupoId } from "./soluciones";

/** Tinte suave de cada grupo (benchmark §5.6: Vende = chicha, Opera = rocoto, Haz que vuelvan = hierbabuena). */
export const TINTE_GRUPO: Record<GrupoId, { fondo: string; texto: string; borde: string; solido: string }> = {
  vende: { fondo: "bg-chicha-50", texto: "text-chicha-700", borde: "border-chicha-200", solido: "bg-chicha-600" },
  opera: { fondo: "bg-rocoto-50", texto: "text-rocoto-600", borde: "border-rocoto-100", solido: "bg-rocoto-500" },
  vuelven: { fondo: "bg-hierba-50", texto: "text-hierba-700", borde: "border-hierba-100", solido: "bg-hierba-600" },
};
