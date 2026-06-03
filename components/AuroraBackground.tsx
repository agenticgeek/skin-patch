export default function AuroraBackground({ hero = false }: { hero?: boolean }) {
  if (hero) {
    return (
      <div className="aurora" aria-hidden="true">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
        <span className="blob b4" />
      </div>
    );
  }

  return (
    <div className="bg-aurora" aria-hidden="true">
      <span className="blob b1" />
      <span className="blob b2" />
      <span className="blob b3" />
    </div>
  );
}
