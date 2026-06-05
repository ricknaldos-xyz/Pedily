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
          className={`mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
            dark
              ? "bg-white/10 text-sand-300"
              : "bg-primary-50 text-primary-600"
          }`}
        >
          {badge}
        </span>
      )}
      <h2
        className={`text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl ${
          dark ? "text-white" : "text-sand-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            dark ? "text-sand-400" : "text-sand-500"
          } ${isCenter ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
        >
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  );
}
