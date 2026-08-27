import GrinOneLogo from "@/components/GrinOneLogo";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a14] text-[#e0e0e0] px-4">
      <div className="w-full max-w-lg rounded-xl border border-white/[0.08] bg-white/[0.02] p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#e63946]/10 border border-[#e63946]/30 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-[#e63946]" />
          </div>
        </div>

        <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-2">
          ERROR CODE: 404 — SIGNAL LOST
        </p>
        <h1 className="font-heading text-4xl font-bold text-white mb-2">404</h1>
        <h2 className="font-heading text-lg font-semibold text-gray-300 mb-4">
          Page Not Found
        </h2>

        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          Sorry, the page you are looking for doesn't exist.
          <br />
          It may have been moved or deleted.
        </p>

        <button
          onClick={() => setLocation("/")}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#e63946] to-[#f77f00] text-white font-heading text-sm font-bold shadow-lg shadow-[#e63946]/20 hover:shadow-[#e63946]/40 transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
        >
          <Home className="w-4 h-4" />
          Return to Mission Control
        </button>

        <div className="mt-8 pt-4 border-t border-white/[0.05] flex items-center justify-center gap-2">
          <GrinOneLogo size={16} />
          <span className="font-mono text-[9px] text-gray-600 tracking-wider">
            GRINONE — DONATION PLATFORM ROADMAP
          </span>
        </div>
      </div>
    </div>
  );
}
