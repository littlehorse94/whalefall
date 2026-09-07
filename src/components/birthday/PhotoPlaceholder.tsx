'use client';

/**
 * Stand-in for a real couple photo — swap the background of whichever
 * section uses this once real photos are ready. Kept as an obvious
 * placeholder (icon + label) rather than a stock image so nobody mistakes
 * it for finished content.
 */
export default function PhotoPlaceholder({
  label, className = '', style,
}: {
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 ${className}`}
      style={{
        background: 'linear-gradient(135deg, #fde2ea 0%, #fbc9d9 50%, #f6a8c2 100%)',
        color: 'rgba(190,60,110,0.55)',
        ...style,
      }}
    >
      <svg width="15%" height="15%" viewBox="0 0 24 24" fill="none" style={{ minWidth: 28, minHeight: 28 }}>
        <path
          d="M4 7h3l1.5-2h7L17 7h3a1 1 0 011 1v11a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      {label && (
        <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.03em' }}>{label}</span>
      )}
    </div>
  );
}
