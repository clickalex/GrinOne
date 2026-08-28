/*
 * GrinOne Logo — Custom SVG mark
 * Combines a stylized smile/heart with radiating lines representing generosity
 */
export default function GrinOneLogo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main heart/smile shape */}
      <path
        d="M32 52C32 52 8 36 8 22C8 14 14 8 22 8C27 8 30 11 32 14C34 11 37 8 42 8C50 8 56 14 56 22C56 36 32 52 32 52Z"
        fill="url(#grinGradient)"
        stroke="url(#grinStroke)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Inner smile arc */}
      <path
        d="M22 30C26 36 38 36 42 30"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      {/* Radiating dots above */}
      <circle cx="20" cy="16" r="2" fill="#f77f00" opacity="0.7" />
      <circle cx="32" cy="12" r="2.5" fill="#e63946" opacity="0.8" />
      <circle cx="44" cy="16" r="2" fill="#f77f00" opacity="0.7" />
      <defs>
        <linearGradient
          id="grinGradient"
          x1="8"
          y1="8"
          x2="56"
          y2="52"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#f77f00" />
          <stop offset="100%" stopColor="#e63946" />
        </linearGradient>
        <linearGradient
          id="grinStroke"
          x1="8"
          y1="8"
          x2="56"
          y2="52"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#f77f00" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#e63946" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  );
}
