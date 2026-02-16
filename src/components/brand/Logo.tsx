'use client';

import { useEffect, useState } from 'react';

type LogoVariant = 'full' | 'icon';
type LogoSize = 'sm' | 'md' | 'lg';

interface LogoProps {
  /** Show full logo with text, or icon only */
  variant?: LogoVariant;
  /** Size preset */
  size?: LogoSize;
  /** Enable eye animation (respects prefers-reduced-motion) */
  animated?: boolean;
  /** Override width in px */
  width?: number;
  /** Override height in px */
  height?: number;
  /** Additional CSS classes */
  className?: string;
}

const SIZES: Record<LogoVariant, Record<LogoSize, { w: number; h: number }>> = {
  full: { sm: { w: 160, h: 37 }, md: { w: 220, h: 51 }, lg: { w: 300, h: 70 } },
  icon: { sm: { w: 32, h: 32 }, md: { w: 48, h: 48 }, lg: { w: 64, h: 64 } },
};

/**
 * Be-Found brand logo component.
 *
 * Features:
 * - Automatic dark/light mode switching
 * - Animated eye (pupil looks around, sparkle pulses, blinks)
 * - Respects prefers-reduced-motion
 * - SVG inline for crisp rendering at any size
 */
export function Logo({
  variant = 'full',
  size = 'md',
  animated = true,
  width,
  height,
  className = '',
}: LogoProps) {
  const dims = SIZES[variant][size];
  const w = width ?? dims.w;
  const h = height ?? dims.h;

  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const shouldAnimate = animated && !reducedMotion;

  if (variant === 'icon') {
    return <IconLogo width={w} height={h} animated={shouldAnimate} className={className} />;
  }

  return <FullLogo width={w} height={h} animated={shouldAnimate} className={className} />;
}

/* ─── Animation CSS (shared) ─── */
const ANIM_STYLES = `
  @keyframes bf-pupil{0%,5%{transform:translate(-2px,1px)}15%{transform:translate(2px,-1px)}30%{transform:translate(-1px,-1px)}42%{transform:translate(1px,0)}50%,65%{transform:translate(0,0)}75%{transform:translate(1px,1px)}88%{transform:translate(-1px,0)}95%,100%{transform:translate(-2px,1px)}}
  @keyframes bf-sparkle{0%,42%{transform:scale(.7);opacity:.5}50%{transform:scale(1.3);opacity:1}55%,62%{transform:scale(1);opacity:1}75%,100%{transform:scale(.7);opacity:.5}}
  @keyframes bf-glow{0%,42%{opacity:0}48%{opacity:.5}55%,62%{opacity:.7}72%,100%{opacity:0}}
  @keyframes bf-iris{0%,42%{r:9;opacity:.3}50%,62%{r:10;opacity:.5}75%,100%{r:9;opacity:.3}}
  @keyframes bf-blink{0%,84%{transform:scaleY(1)}86%{transform:scaleY(.05)}88%,100%{transform:scaleY(1)}}
`;

/* ─── Eye SVG (shared between full and icon) ─── */
function EyeSvg({ cx, cy, scale, animated }: { cx: number; cy: number; scale: number; animated: boolean }) {
  const s = scale;
  return (
    <g transform={`translate(${cx}, ${cy}) scale(${s})`}>
      {animated && <style>{ANIM_STYLES}</style>}

      {/* Glow aura */}
      {animated && (
        <circle r="24" fill="url(#bf-glow)" opacity="0" style={animated ? { animation: 'bf-glow 5s ease-in-out infinite' } : undefined} />
      )}

      <g style={animated ? { animation: 'bf-blink 5s ease-in-out infinite', transformOrigin: '0 0' } : undefined}>
        {/* Outer glow lines */}
        <path d="M-22,0 Q0,-24 22,0" fill="none" stroke="var(--bf-gold)" strokeWidth="1" opacity="0.12" />
        <path d="M-22,0 Q0,24 22,0" fill="none" stroke="var(--bf-gold)" strokeWidth="1" opacity="0.12" />

        {/* Eye lids */}
        <path d="M-20,0 Q0,-21 20,0" fill="none" stroke="url(#bf-gold-grad)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M-20,0 Q0,21 20,0" fill="none" stroke="url(#bf-gold-grad)" strokeWidth="2.5" strokeLinecap="round" />

        {/* Iris */}
        <circle r="11" fill="none" stroke="var(--bf-amber)" strokeWidth="1.2" opacity="0.4" />
        <circle r="9" fill="url(#bf-iris-grad)" opacity="0.3"
          style={animated ? { animation: 'bf-iris 5s ease-in-out infinite' } : undefined} />

        {/* Pupil group */}
        <g style={animated ? { animation: 'bf-pupil 5s cubic-bezier(.4,0,.2,1) infinite' } : undefined}>
          <circle r="6" fill="#020617" />
          <circle r="6" fill="none" stroke="var(--bf-amber)" strokeWidth="0.5" opacity="0.3" />
          <circle cx="4" cy="-4" r="1.8" fill="#F8FAFC" opacity="0.5" />
          <circle cx="-4" cy="4" r="0.8" fill="#F8FAFC" opacity="0.2" />
        </g>

        {/* AI sparkle */}
        <g style={animated ? { animation: 'bf-sparkle 5s ease-in-out infinite', transformOrigin: '0 0' } : undefined}>
          <path d="M0,-6 L1.5,-2.2 L5.5,0 L1.5,2.2 L0,6 L-1.5,2.2 L-5.5,0 L-1.5,-2.2 Z" fill="var(--bf-gold)" />
          <path d="M0,-4 L0.8,-1.5 L3,0 L0.8,1.5 L0,4 L-0.8,1.5 L-3,0 L-0.8,-1.5 Z" fill="var(--bf-gold-light)" opacity="0.6" />
        </g>
      </g>
    </g>
  );
}

/* ─── Full Logo (eye + text) ─── */
function FullLogo({ width, height, animated, className }: { width: number; height: number; animated: boolean; className: string }) {
  return (
    <svg
      viewBox="0 0 300 70"
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label="Be-Found — AI Visibility Experts"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bf-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" className="[stop-color:var(--bf-gold)]" />
          <stop offset="100%" className="[stop-color:var(--bf-amber)]" />
        </linearGradient>
        <radialGradient id="bf-iris-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" className="[stop-color:var(--bf-gold)]" stopOpacity="0.9" />
          <stop offset="55%" className="[stop-color:var(--bf-amber)]" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0.8" />
        </radialGradient>
        <radialGradient id="bf-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" className="[stop-color:var(--bf-gold)]" stopOpacity="0.4" />
          <stop offset="100%" className="[stop-color:var(--bf-gold)]" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* CSS custom properties for dark/light switching */}
      <style>{`
        svg { --bf-gold: #F59E0B; --bf-amber: #D97706; --bf-gold-light: #FBBF24; --bf-text: #F8FAFC; --bf-dash: #F59E0B; --bf-sub: #334155; }
        @media (prefers-color-scheme: light) {
          svg { --bf-gold: #D97706; --bf-amber: #B45309; --bf-gold-light: #F59E0B; --bf-text: #0F172A; --bf-dash: #D97706; --bf-sub: #334155; }
        }
        :root.dark svg { --bf-gold: #F59E0B; --bf-amber: #D97706; --bf-gold-light: #FBBF24; --bf-text: #F8FAFC; --bf-dash: #F59E0B; --bf-sub: #334155; }
        :root:not(.dark) svg { --bf-gold: #D97706; --bf-amber: #B45309; --bf-gold-light: #F59E0B; --bf-text: #0F172A; --bf-dash: #D97706; --bf-sub: #334155; }
      `}</style>

      <EyeSvg cx={26} cy={33} scale={1} animated={animated} />

      {/* Be-Found text */}
      <text x="60" y="33" fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif" fontSize="28" fontWeight="800" letterSpacing="-0.5">
        <tspan fill="var(--bf-text)">Be</tspan>
        <tspan fill="var(--bf-dash)">-</tspan>
        <tspan fill="var(--bf-text)">Found</tspan>
      </text>

      {/* Tagline */}
      <text x="61" y="50" fontFamily="Inter, -apple-system, BlinkMacSystemFont, sans-serif" fontSize="10" fontWeight="500" fill="var(--bf-sub)" letterSpacing="3">
        AI VISIBILITY EXPERTS
      </text>
    </svg>
  );
}

/* ─── Icon Only ─── */
function IconLogo({ width, height, animated, className }: { width: number; height: number; animated: boolean; className: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={width}
      height={height}
      className={className}
      role="img"
      aria-label="Be-Found"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bf-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <radialGradient id="bf-iris-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#D97706" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0F172A" stopOpacity="0.8" />
        </radialGradient>
        <radialGradient id="bf-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>
      </defs>

      <EyeSvg cx={32} cy={32} scale={1.35} animated={animated} />
    </svg>
  );
}
