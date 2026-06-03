type SectionMediaProps = {
  label: string;
  title?: string;
  aspect?: "wide" | "landscape" | "portrait" | "square";
  tone?: "light" | "dark" | "beige";
  className?: string;
};

export default function SectionMedia({
  label,
  title,
  aspect = "landscape",
  tone = "light",
  className = "",
}: SectionMediaProps) {
  return (
    <figure
      className={`section-media section-media--${aspect} section-media--${tone} rise-item ${className}`.trim()}
    >
      <div className="section-media__frame">
        <div className="section-media__glow" aria-hidden="true" />
        <span className="section-media__glyph" aria-hidden="true">
          ⌁
        </span>
      </div>
      <figcaption className="section-media__caption">
        <span className="section-media__label">{label}</span>
        {title ? <span className="section-media__title">{title}</span> : null}
      </figcaption>
    </figure>
  );
}
