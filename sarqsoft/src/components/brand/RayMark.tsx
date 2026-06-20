import {cn} from '@/lib/utils';

/**
 * Şərq Soft mark — the sun of the East rising over a horizon, rays fanning
 * upward. Abstract, scalable, derived from the "light of the East" concept.
 */
export function RayMark({className}: {className?: string}) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={cn(className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="rm-g" x1="6" y1="40" x2="42" y2="8">
          <stop offset="0" stopColor="#ff7d55" />
          <stop offset="0.5" stopColor="#f6a04a" />
          <stop offset="1" stopColor="#f6cf85" />
        </linearGradient>
      </defs>
      {/* rays */}
      <g stroke="url(#rm-g)" strokeWidth="2.4" strokeLinecap="round">
        <path d="M24 4.5v6" opacity="0.95" />
        <path d="M37.8 10.2l-4.2 4.2" opacity="0.8" />
        <path d="M10.2 10.2l4.2 4.2" opacity="0.8" />
        <path d="M43.5 24h-6" opacity="0.6" />
        <path d="M10.5 24h-6" opacity="0.6" />
      </g>
      {/* sun rising */}
      <path
        d="M11 31a13 13 0 0 1 26 0"
        stroke="url(#rm-g)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* horizon */}
      <path
        d="M5 38h12.5M30.5 38H43"
        stroke="url(#rm-g)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}
