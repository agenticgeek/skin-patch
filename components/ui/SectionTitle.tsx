type SectionTitleProps = {
  lines: string[];
  className?: string;
};

export default function SectionTitle({ lines, className = "" }: SectionTitleProps) {
  return (
    <h2 className={`section-title ${className}`.trim()}>
      {lines.map((line) => (
        <span className="line" key={line}>
          {line}
        </span>
      ))}
    </h2>
  );
}
