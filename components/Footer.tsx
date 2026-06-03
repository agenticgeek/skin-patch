export default function Footer() {
  return (
    <footer className="metcare-footer" data-screen-label="Footer">
      <div className="container">
        <div className="footer-brand">
          METCARE
          <span style={{ fontSize: "0.5em", verticalAlign: "super", opacity: 0.7 }}>
            ®
          </span>
        </div>
        <p className="footer-disclaimer">
          Les produits METCARE® s&apos;inscrivent dans une démarche cosmétique de
          confort et d&apos;accompagnement cutané. Ils ne constituent ni des
          médicaments ni une prise en charge médicale et ne se substituent pas
          aux recommandations des professionnels de santé.
        </p>
        <div className="footer-meta">
          <span>© 2026 METCARE® — My Esthetic Travel®</span>
          <span>Recovery Lifestyle Innovation™</span>
        </div>
      </div>
    </footer>
  );
}
