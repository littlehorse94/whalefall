'use client';

import { useEffect, useRef, useState } from 'react';
import type { SectionPreview } from '@/lib/admin-sections';

const REF_WIDTH = 1280;
const REF_HEIGHT = 900;
const THUMB_WIDTH = 168;
const THUMB_HEIGHT = Math.round((THUMB_WIDTH / REF_WIDTH) * REF_HEIGHT);
const POPOUT_WIDTH = 640;
const POPOUT_HEIGHT = Math.round((POPOUT_WIDTH / REF_WIDTH) * REF_HEIGHT);

function frameStyle(scale: number): React.CSSProperties {
  return {
    width: `${REF_WIDTH}px`,
    height: `${REF_HEIGHT}px`,
    transform: `scale(${scale})`,
    transformOrigin: 'top left',
    border: 'none',
    pointerEvents: 'none',
    display: 'block',
  };
}

function PreviewFrame({ preview, scale }: { preview: SectionPreview; scale: number }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleLoad = () => {
    try {
      iframeRef.current?.contentWindow?.scrollTo(0, preview.scrollTop);
    } catch {
      // Cross-origin or not-yet-ready — ignore, the frame just won't be pre-scrolled.
    }
  };

  return (
    <iframe
      ref={iframeRef}
      src={`${preview.path}?preview=1`}
      loading="lazy"
      tabIndex={-1}
      aria-hidden="true"
      onLoad={handleLoad}
      style={frameStyle(scale)}
    />
  );
}

export default function LivePreview({ preview, label }: { preview: SectionPreview; label: string }) {
  const [open, setOpen] = useState(false);
  const [hoverCapable, setHoverCapable] = useState(true);
  const [anchorRight, setAnchorRight] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Deliberately deferred to an effect (not a lazy useState initializer): reading
    // matchMedia during render would mismatch the server-rendered HTML (which
    // always assumes hover-capable) whenever the real client is touch-only.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHoverCapable(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  const openHover = () => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (rect) setAnchorRight(rect.left + POPOUT_WIDTH > window.innerWidth - 16);
    setOpen(true);
  };

  return (
    <div ref={wrapperRef} className="relative inline-block flex-shrink-0">
      <div
        className="relative flex-shrink-0"
        style={{
          width: `${THUMB_WIDTH}px`,
          height: `${THUMB_HEIGHT}px`,
          borderRadius: '8px',
          overflow: 'hidden',
          border: '2px solid rgba(77,217,232,0.5)',
          boxShadow: '0 0 10px rgba(77,217,232,0.25)',
          background: '#0a0e1a',
        }}
        onMouseEnter={hoverCapable ? openHover : undefined}
        onMouseLeave={hoverCapable ? () => setOpen(false) : undefined}
        onClick={
          hoverCapable
            ? undefined
            : (e) => {
                e.stopPropagation();
                e.preventDefault();
                setOpen((v) => !v);
              }
        }
      >
        <PreviewFrame preview={preview} scale={THUMB_WIDTH / REF_WIDTH} />
      </div>

      {open && hoverCapable && (
        <div
          className="absolute z-50"
          style={{
            top: `${THUMB_HEIGHT + 8}px`,
            ...(anchorRight ? { right: 0 } : { left: 0 }),
            width: `${POPOUT_WIDTH}px`,
            height: `${POPOUT_HEIGHT}px`,
            borderRadius: '10px',
            overflow: 'hidden',
            border: '2px solid #4dd9e8',
            boxShadow: '0 0 30px rgba(77,217,232,0.4), 0 10px 40px rgba(0,0,0,0.6)',
            background: '#0a0e1a',
          }}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <PreviewFrame preview={preview} scale={POPOUT_WIDTH / REF_WIDTH} />
        </div>
      )}

      {open && !hoverCapable && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.7)' }}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative"
            style={{
              width: 'min(92vw, 640px)',
              maxWidth: '100%',
              borderRadius: '10px',
              overflow: 'hidden',
              border: '2px solid #4dd9e8',
              boxShadow: '0 0 30px rgba(77,217,232,0.4)',
              background: '#0a0e1a',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ width: '100%', aspectRatio: `${REF_WIDTH} / ${REF_HEIGHT}`, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <PopoutResponsiveFrame preview={preview} />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close preview"
              style={{
                position: 'absolute', top: '8px', right: '8px',
                width: '32px', height: '32px', borderRadius: '50%',
                background: 'rgba(5,8,16,0.85)', border: '1px solid rgba(77,217,232,0.4)',
                color: '#e8f4f8', fontSize: '1.1rem', lineHeight: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}
            >
              ✕
            </button>
            <div style={{ padding: '0.6rem 0.9rem', fontSize: '0.75rem', color: 'rgba(232,244,248,0.5)', borderTop: '1px solid rgba(77,217,232,0.15)' }}>
              {label}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** Same idea as PreviewFrame, but scales to fill whatever width its (responsive) container ends up being. */
function PopoutResponsiveFrame({ preview }: { preview: SectionPreview }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(POPOUT_WIDTH / REF_WIDTH);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / REF_WIDTH);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <PreviewFrame preview={preview} scale={scale} />
    </div>
  );
}
