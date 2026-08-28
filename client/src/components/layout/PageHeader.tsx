import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronRight, type LucideIcon } from "lucide-react";
import { Link } from "wouter";

/**
 * Compact mission-control style header used at the top of every sub-page,
 * mirroring the hero styling of the home page.
 */
export function PageHeader({
  icon: Icon,
  kicker,
  title,
  description,
  accent = "#e63946",
  badge,
  children,
}: {
  icon: LucideIcon;
  kicker: string;
  title: string;
  description: string;
  accent?: string;
  badge?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative pt-24 md:pt-28 pb-10 overflow-hidden">
      {/* grid backdrop */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-[1px]"
        style={{
          background: `linear-gradient(to right, transparent, ${accent}40, transparent)`,
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* breadcrumb */}
          <div className="flex items-center gap-1.5 mb-4 font-mono text-[10px] text-gray-600 tracking-wider">
            <Link href="/" className="hover:text-gray-400 transition-colors">
              HOME
            </Link>
            <ChevronRight size={10} />
            <span style={{ color: accent }}>{kicker.toUpperCase()}</span>
          </div>

          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded flex items-center justify-center shrink-0"
              style={{
                backgroundColor: `${accent}18`,
                border: `1px solid ${accent}35`,
              }}
            >
              <Icon size={22} style={{ color: accent }} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span
                  className="font-mono text-[10px] px-2 py-0.5 rounded uppercase tracking-widest"
                  style={{
                    backgroundColor: `${accent}15`,
                    color: accent,
                  }}
                >
                  {kicker}
                </span>
                {badge && (
                  <span
                    className="px-1.5 py-0.5 rounded border font-mono text-[7px]"
                    style={{
                      borderColor: `${accent}30`,
                      backgroundColor: `${accent}10`,
                      color: accent,
                    }}
                  >
                    {badge}
                  </span>
                )}
              </div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-white leading-tight">
                {title}
              </h1>
              <p className="text-sm text-gray-400 mt-2 max-w-2xl">
                {description}
              </p>
            </div>
          </div>

          {children && <div className="mt-6">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
