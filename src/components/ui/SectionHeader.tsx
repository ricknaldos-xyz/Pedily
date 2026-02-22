import { AnimatedSection } from "./AnimatedSection";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  dark?: boolean;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  dark = false,
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <AnimatedSection className={isCenter ? "text-center" : ""}>
      {badge && (
        <span
          className={`mb-4 inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold ${
            dark
              ? "bg-accent-500/10 text-accent-400"
              : "bg-gradient-to-r from-primary-50 to-accent-50 text-primary-700 ring-1 ring-primary-200/50"
          }`}
        >
          {badge}
        </span>
      )}
      <h2
        className={`text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            dark ? "text-slate-400" : "text-slate-500"
          } ${isCenter ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
        >
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  );
}
