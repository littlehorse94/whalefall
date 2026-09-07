// Purely decorative, static background accents — flowers, blurred color
// blobs, and simple geometric shapes — used to break up the plain gradient
// background across the birthday page's sections. No randomness, so these
// are safe to render on the server (no hydration-mismatch concerns).

export function Blob({
  size, color, style,
}: {
  size: number;
  color: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size, background: color, filter: 'blur(60px)',
        opacity: 0.38, mixBlendMode: 'multiply', ...style,
      }}
    />
  );
}

export function Blossom({
  size = 40, color = '#e8799e', center = '#fbe3ae', opacity = 0.55, rotate = 0, style,
}: {
  size?: number;
  color?: string;
  center?: string;
  opacity?: number;
  rotate?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      className="absolute pointer-events-none"
      style={{ width: size, height: size, opacity, transform: `rotate(${rotate}deg)`, ...style }}
    >
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse key={deg} cx="50" cy="28" rx="14" ry="22" fill={color} transform={`rotate(${deg} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="8" fill={center} />
    </svg>
  );
}

export function RingShape({
  size = 60, color = '#d94f7c', opacity = 0.3, style,
}: {
  size?: number;
  color?: string;
  opacity?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className="absolute rounded-full pointer-events-none"
      style={{ width: size, height: size, border: `2px solid ${color}`, opacity, ...style }}
    />
  );
}

export function DiamondShape({
  size = 18, color = '#d94f7c', opacity = 0.4, style,
}: {
  size?: number;
  color?: string;
  opacity?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className="absolute pointer-events-none"
      style={{ width: size, height: size, background: color, opacity, borderRadius: 4, transform: 'rotate(45deg)', ...style }}
    />
  );
}

export function Sparkle({
  size = 16, color = '#d94f7c', opacity = 0.55, style,
}: {
  size?: number;
  color?: string;
  opacity?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="absolute pointer-events-none"
      style={{ width: size, height: size, opacity, ...style }}
    >
      <path d="M12 0 L14.2 9.8 L24 12 L14.2 14.2 L12 24 L9.8 14.2 L0 12 L9.8 9.8 Z" fill={color} />
    </svg>
  );
}
