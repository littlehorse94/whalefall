export default function Footer() {
  return (
    <footer style={{
      position: 'relative', zIndex: 10, padding: '3rem 1.5rem', textAlign: 'center',
      background: 'rgba(1,2,4,0.95)', borderTop: '1px solid rgba(77,217,232,0.1)',
    }}>
      <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
        <div className="shimmer-text" style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem', fontFamily: "'Cinzel Decorative', cursive" }}>
          <span style={{ fontFamily: "'Long Cang', cursive" }}>鲸落</span>
          {' | Whalefall'}
        </div>
        <p style={{ fontSize: '0.75rem', color: 'rgba(232,244,248,0.35)', marginBottom: '1.5rem', letterSpacing: '0.2em', fontFamily: "'Cinzel', serif" }}>
          TOP 60 SEA GUILD · WHERE WINDS MEET · EST. 2022
        </p>
        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(77,217,232,0.2), transparent)', marginBottom: '1.5rem' }} />
        <p style={{ fontSize: '0.75rem', color: 'rgba(232,244,248,0.2)', fontFamily: "'Cinzel', serif" }}>
          © 2026 Whalefall Guild. All memories preserved in the deep.
        </p>
        <p style={{ fontSize: '0.7rem', color: 'rgba(232,244,248,0.15)', marginTop: '0.75rem', fontFamily: "'Cinzel', serif", letterSpacing: '0.1em' }}>
          Developed by Macatting Studio
        </p>
      </div>
    </footer>
  );
}
