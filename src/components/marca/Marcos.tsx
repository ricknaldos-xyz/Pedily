import { clsx } from "clsx";

/**
 * Marcos de dispositivo propios, sobrios y sin marca (CSS puro): celular,
 * navegador, portátil y pantalla de kiosko en su pie. Las capturas que van
 * dentro son siempre del producto real o mini-interfaces con datos de la demo
 * marcadas como tales.
 */

export function MarcoCelular({
  children,
  className,
  oscuro = true,
}: {
  children: React.ReactNode;
  className?: string;
  oscuro?: boolean;
}) {
  return (
    <div
      className={clsx(
        "relative rounded-[2.4rem] p-[9px] shadow-elevated",
        oscuro ? "bg-tinta" : "bg-white ring-1 ring-tinta/10",
        className
      )}
    >
      <div className="relative overflow-hidden rounded-[1.9rem] bg-white">
        <div
          aria-hidden
          className="absolute left-1/2 top-2 z-10 h-[18px] w-[34%] -translate-x-1/2 rounded-full bg-tinta"
        />
        {children}
      </div>
    </div>
  );
}

export function MarcoNavegador({
  children,
  url,
  className,
  oscuro = false,
  pestanas,
}: {
  children: React.ReactNode;
  url?: string;
  className?: string;
  oscuro?: boolean;
  pestanas?: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "overflow-hidden rounded-2xl shadow-elevated ring-1",
        oscuro ? "bg-[#1b1320] ring-white/10" : "bg-white ring-tinta/10",
        className
      )}
    >
      <div
        className={clsx(
          "flex items-center gap-3 border-b px-3 py-2.5 sm:px-4",
          oscuro ? "border-white/10 bg-[#241a2b]" : "border-tinta/10 bg-sand-100"
        )}
      >
        <div aria-hidden className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rocoto-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-aji-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-hierba-300" />
        </div>
        {url && (
          <div
            className={clsx(
              "min-w-0 flex-1 truncate rounded-md px-3 py-1 font-mono text-[11px]",
              oscuro ? "bg-white/5 text-white/60" : "bg-white text-humo"
            )}
          >
            {url}
          </div>
        )}
      </div>
      {pestanas}
      {children}
    </div>
  );
}

export function MarcoPortatil({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx("relative", className)}>
      <div className="rounded-t-[1.1rem] bg-tinta p-[7px] pb-[9px] shadow-elevated">
        <div className="overflow-hidden rounded-[0.6rem] bg-black">{children}</div>
      </div>
      <div aria-hidden className="mx-[-4%] h-3 rounded-b-xl bg-gradient-to-b from-[#3a2b44] to-[#24102e]" />
      <div aria-hidden className="mx-auto h-1 w-1/5 rounded-b-md bg-[#3a2b44]" />
    </div>
  );
}

/** Pantalla táctil de autoservicio en su pie (vertical). */
export function MarcoKiosko({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx("flex flex-col items-center", className)}>
      <div className="w-full rounded-[1.4rem] bg-tinta p-[10px] shadow-elevated">
        <div className="overflow-hidden rounded-[0.9rem] bg-white">{children}</div>
      </div>
      <div aria-hidden className="h-10 w-[14%] bg-gradient-to-b from-[#3a2b44] to-[#24102e]" />
      <div aria-hidden className="h-2.5 w-[46%] rounded-t-lg bg-tinta" />
    </div>
  );
}
