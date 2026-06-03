import ExperienceAurora from "@/components/illustrations/ExperienceAurora";
import SectionMedia from "@/components/ui/SectionMedia";
import SectionTitle from "@/components/ui/SectionTitle";

export default function ExperienceSection() {
  return (
    <section
      className="scene"
      data-screen-label="02 Nouvelle expérience"
      id="section-2"
    >
      <ExperienceAurora />
      <div className="container reveal">
        <header className="section-head">
          <div className="num stagger-child">
            § 02 <span className="slash">/</span> Recovery Cutané
          </div>
          <SectionTitle
            lines={["Une nouvelle expérience", "de recovery cutané."]}
          />
          <p className="lede stagger-child">
            Le SKIN RECOVERY PATCH™ est né d&apos;une volonté simple :
            transformer l&apos;expertise recovery esthétique en une expérience
            skincare moderne, sensorielle et facile à intégrer dans le
            quotidien.
          </p>
        </header>

        <div className="section-editorial section-editorial--reverse">
          <div className="section-editorial__content">
            <div className="split split--luxe" data-grid-motion data-rise-stagger>
              <article className="card card--luxe rise-item">
                <span className="card--luxe__chrome" aria-hidden="true" />
                <span className="label">Origine</span>
                <h3>Né du terrain esthétique.</h3>
                <p className="body">
                  Développé à partir de plusieurs années d&apos;observation du
                  terrain esthétique et des besoins fréquemment rencontrés pendant
                  les phases de récupération, le SKIN RECOVERY PATCH™ accompagne
                  les moments où la peau semble fragilisée.
                </p>
              </article>

              <div
                className="list-card list-card--luxe"
                data-grid-motion
                data-rise-stagger
                aria-label="Symptômes ciblés"
              >
                <header className="list-card--luxe__head">
                  <span className="label">Profil cutané</span>
                  <p className="list-card--luxe__sub">
                    Quand la peau exprime le besoin de recovery.
                  </p>
                </header>
                <div className="row rise-item">
                  <span className="idx">01</span>
                  <span className="txt silver">sensibilisée,</span>
                </div>
                <div className="row rise-item">
                  <span className="idx">02</span>
                  <span className="txt silver">inconfortable,</span>
                </div>
                <div className="row rise-item">
                  <span className="idx">03</span>
                  <span className="txt silver">fatiguée,</span>
                </div>
                <div className="row rise-item">
                  <span className="idx">04</span>
                  <span className="txt silver">déshydratée,</span>
                </div>
                <div className="row rise-item">
                  <span className="idx">05</span>
                  <span className="txt silver">
                    ou en recherche de fraîcheur et de confort.
                  </span>
                </div>
              </div>
            </div>

            <blockquote className="quote-card quote-card--luxe rise-item">
              <span className="quote-card--luxe__mark" aria-hidden="true">
                //
              </span>
              <p>
                Une nouvelle approche du patch cosmétique pensée autour du
                Recovery Lifestyle™.
              </p>
            </blockquote>
          </div>

          <SectionMedia
            aspect="portrait"
            label="// Visuel — expérience recovery"
            title="Portrait lifestyle · application du patch"
          />
        </div>
      </div>
    </section>
  );
}
