import React from 'react';

/**
 * BankIllustration Component
 * Renders the neoclassical bank building illustration with soft sky, trees, and clouds
 * closely matching the approved Banking Services UI reference.
 */
export default function BankIllustration({ className = '' }) {
  return (
    <svg
      viewBox="0 0 520 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`bank-illustration ${className}`}
      aria-label="Banking illustration"
      role="img"
    >
      <defs>
        <linearGradient id="skyGrad" x1="260" y1="20" x2="260" y2="320" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#bfdbfe" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#e0f2fe" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="bankRoof" x1="260" y1="60" x2="260" y2="150" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>

        <linearGradient id="pillarGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#93c5fd" />
          <stop offset="40%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>

        <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dbeafe" />
        </linearGradient>

        <filter id="softShadow" x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#1e3a8a" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Background Soft Glow Circle */}
      <circle cx="260" cy="180" r="150" fill="url(#skyGrad)" />

      {/* Decorative Clouds */}
      <g opacity="0.85">
        <path d="M70 140 A18 18 0 0 1 106 140 A24 24 0 0 1 144 140 A14 14 0 0 1 156 150 L64 150 A12 12 0 0 1 70 140 Z" fill="url(#cloudGrad)" />
        <path d="M370 110 A16 16 0 0 1 402 110 A22 22 0 0 1 436 110 A12 12 0 0 1 448 120 L364 120 A10 10 0 0 1 370 110 Z" fill="url(#cloudGrad)" />
      </g>

      {/* Lush Green Trees / Bushes behind bank */}
      <g>
        {/* Left trees */}
        <circle cx="160" cy="245" r="32" fill="#22c55e" />
        <circle cx="138" cy="255" r="26" fill="#16a34a" />
        <circle cx="178" cy="255" r="24" fill="#4ade80" />

        {/* Right trees */}
        <circle cx="360" cy="245" r="32" fill="#22c55e" />
        <circle cx="382" cy="255" r="26" fill="#16a34a" />
        <circle cx="342" cy="255" r="24" fill="#4ade80" />
      </g>

      {/* Main Bank Structure */}
      <g filter="url(#softShadow)">
        {/* Dome */}
        <ellipse cx="260" cy="85" rx="36" ry="24" fill="#2563eb" />
        <rect x="256" y="52" width="8" height="15" rx="3" fill="#60a5fa" />
        <circle cx="260" cy="48" r="5" fill="#f59e0b" />

        {/* Triangular Pediment (Roof) */}
        <polygon points="260,75 140,135 380,135" fill="url(#bankRoof)" />
        <polygon points="260,82 154,132 366,132" fill="#1e40af" opacity="0.6" />

        {/* Pediment Text "BANK" */}
        <rect x="232" y="106" width="56" height="18" rx="4" fill="#1e3a8a" />
        <text
          x="260"
          y="119"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="11"
          fontWeight="bold"
          letterSpacing="2.5"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          BANK
        </text>

        {/* Entablature Beam */}
        <rect x="148" y="135" width="224" height="14" rx="2" fill="#3b82f6" />
        <rect x="156" y="142" width="208" height="3" fill="#60a5fa" opacity="0.7" />

        {/* Bank Main Building Body / Portico Backing */}
        <rect x="160" y="149" width="200" height="100" fill="#1d4ed8" />
        <rect x="166" y="153" width="188" height="92" fill="#1e3a8a" />

        {/* Arch Doorway */}
        <path d="M236 245 V 195 A 24 24 0 0 1 284 195 V 245 Z" fill="#93c5fd" />
        <path d="M240 245 V 197 A 20 20 0 0 1 280 197 V 245 Z" fill="#0f172a" opacity="0.85" />
        {/* Door Glass Divider */}
        <line x1="260" y1="180" x2="260" y2="245" stroke="#93c5fd" strokeWidth="2" />
        <line x1="240" y1="210" x2="280" y2="210" stroke="#93c5fd" strokeWidth="1.5" />

        {/* Windows */}
        <rect x="180" y="172" width="28" height="42" rx="4" fill="#93c5fd" opacity="0.8" />
        <line x1="194" y1="172" x2="194" y2="214" stroke="#1e3a8a" strokeWidth="1.5" />
        <line x1="180" y1="193" x2="208" y2="193" stroke="#1e3a8a" strokeWidth="1.5" />

        <rect x="312" y="172" width="28" height="42" rx="4" fill="#93c5fd" opacity="0.8" />
        <line x1="326" y1="172" x2="326" y2="214" stroke="#1e3a8a" strokeWidth="1.5" />
        <line x1="312" y1="193" x2="340" y2="193" stroke="#1e3a8a" strokeWidth="1.5" />

        {/* Four Classical Columns */}
        {/* Column 1 */}
        <g>
          <rect x="166" y="149" width="16" height="5" rx="1" fill="#bfdbfe" />
          <rect x="168" y="154" width="12" height="88" fill="url(#pillarGrad)" />
          <rect x="166" y="242" width="16" height="5" rx="1" fill="#bfdbfe" />
        </g>
        {/* Column 2 */}
        <g>
          <rect x="216" y="149" width="16" height="5" rx="1" fill="#bfdbfe" />
          <rect x="218" y="154" width="12" height="88" fill="url(#pillarGrad)" />
          <rect x="216" y="242" width="16" height="5" rx="1" fill="#bfdbfe" />
        </g>
        {/* Column 3 */}
        <g>
          <rect x="288" y="149" width="16" height="5" rx="1" fill="#bfdbfe" />
          <rect x="290" y="154" width="12" height="88" fill="url(#pillarGrad)" />
          <rect x="288" y="242" width="16" height="5" rx="1" fill="#bfdbfe" />
        </g>
        {/* Column 4 */}
        <g>
          <rect x="338" y="149" width="16" height="5" rx="1" fill="#bfdbfe" />
          <rect x="340" y="154" width="12" height="88" fill="url(#pillarGrad)" />
          <rect x="338" y="242" width="16" height="5" rx="1" fill="#bfdbfe" />
        </g>

        {/* Steps / Plinth */}
        <rect x="146" y="247" width="228" height="6" rx="1" fill="#93c5fd" />
        <rect x="136" y="253" width="248" height="7" rx="1" fill="#60a5fa" />
        <rect x="124" y="260" width="272" height="8" rx="2" fill="#3b82f6" />
      </g>

      {/* Front Accent Leaves/Plants */}
      <g>
        <path d="M110 275 C 90 260 85 240 105 245 C 115 248 115 265 110 275 Z" fill="#16a34a" />
        <path d="M125 280 C 115 260 125 242 135 252 C 140 258 135 272 125 280 Z" fill="#22c55e" />
        <path d="M410 275 C 430 260 435 240 415 245 C 405 248 405 265 410 275 Z" fill="#16a34a" />
        <path d="M395 280 C 405 260 395 242 385 252 C 380 258 385 272 395 280 Z" fill="#22c55e" />
      </g>
    </svg>
  );
}
