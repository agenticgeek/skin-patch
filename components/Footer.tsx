"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;

  return (
    <footer className="metcare-footer" data-screen-label="Footer">
      <div className="container">
        <div className="footer-brand">
          METCARE
          <span style={{ fontSize: "0.5em", verticalAlign: "super", opacity: 0.7 }}>®</span>
        </div>
        <p className="footer-disclaimer">{f.disclaimer}</p>
        <div className="footer-meta">
          <span>{f.copy}</span>
          <span>{f.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
