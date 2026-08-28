export function DemoSeparator() {
  return (
    <>
      {/* ===== DEMO SECTION SEPARATOR ===== */}
      <div
        id="demo-section"
        className="border-y border-[#e63946]/15 bg-gradient-to-r from-transparent via-[#e63946]/[0.04] to-transparent py-6 scroll-mt-14"
      >
        <div className="max-w-5xl mx-auto px-4 md:px-8 flex items-center justify-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#e63946]/30" />
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] font-bold tracking-[0.3em] text-[#e63946] uppercase">
              Live Demo Zone
            </span>
            <span className="px-2 py-0.5 rounded-full border border-[#e63946]/30 bg-[#e63946]/10 font-mono text-[8px] text-[#e63946]">
              DEMO
            </span>
          </div>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#e63946]/30" />
        </div>
      </div>
    </>
  );
}
