export default function CinematicChrome() {
  return (
    <>
      <aside className="ticker" aria-hidden="true">
        <div className="ticker-rail">
          <span className="ticker-num">01</span>
          <span className="ticker-bar">
            <span className="ticker-fill" />
          </span>
          <span className="ticker-of">/ 07</span>
        </div>
        <div className="ticker-label">Hero</div>
      </aside>

      <div className="chrome-edge top" aria-hidden="true" />
      <div className="chrome-edge bottom" aria-hidden="true" />
    </>
  );
}
