import type { JSX } from "react";

export default function QuizzicalIcon({ size = 64 }): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Base of lightbulb */}
      <circle cx="32" cy="28" r="16" fill="#4D5B9E" stroke="#293264" strokeWidth="2" />

      {/* Highlight on bulb */}
      <ellipse cx="26" cy="22" rx="6" ry="8" fill="#6B7DB8" opacity="0.6" />

      {/* Socket/base */}
      <rect x="28" y="42" width="8" height="6" fill="#293264" stroke="#293264" strokeWidth="1" />

      {/* Threads */}
      <line x1="26" y1="48" x2="26" y2="52" stroke="#293264" strokeWidth="2" />
      <line x1="32" y1="48" x2="32" y2="52" stroke="#293264" strokeWidth="2" />
      <line x1="38" y1="48" x2="38" y2="52" stroke="#293264" strokeWidth="2" />

      {/* Bottom cap */}
      <rect x="27" y="52" width="10" height="4" rx="1" fill="#293264" />

      {/* Question mark inside bulb */}
      <text
        x="32"
        y="34"
        fontSize="20"
        fontWeight="bold"
        fill="#FFFFFF"
        textAnchor="middle"
        fontFamily="Karla, sans-serif"
      >
        ?
      </text>

      {/* Glow rays */}
      <line x1="32" y1="8" x2="32" y2="2" stroke="#4D5B9E" strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="12" x2="54" y2="8" stroke="#4D5B9E" strokeWidth="2" strokeLinecap="round" />
      <line x1="56" y1="28" x2="62" y2="28" stroke="#4D5B9E" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="28" x2="8" y2="28" stroke="#4D5B9E" strokeWidth="2" strokeLinecap="round" />
      <line x1="14" y1="12" x2="10" y2="8" stroke="#4D5B9E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

