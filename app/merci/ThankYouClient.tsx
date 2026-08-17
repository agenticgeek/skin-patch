"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AuroraBackground from "@/components/AuroraBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollEngine from "@/components/ScrollEngine";
import { useLanguage } from "@/context/LanguageContext";

function ThankYouContent() {
  const { t } = useLanguage();
  const c = t.checkout;
  const y = t.thankyou;
  const searchParams = useSearchParams();

  useEffect(() => {
    try {
      const sid = searchParams.get("session_id") || "design-mode";
      if (sessionStorage.getItem("ty_seen") === sid) {
        // already seen — would redirect on back-nav
        // window.location.replace('/');
      }
      sessionStorage.setItem("ty_seen", sid);
      history.pushState(null, "", window.location.href);
      const onPopState = () => {
        // window.location.replace('/');
        history.pushState(null, "", window.location.href);
      };
      window.addEventListener("popstate", onPopState);
      return () => window.removeEventListener("popstate", onPopState);
    } catch {
      /* no-op in design mode */
    }
  }, [searchParams]);

  return (
    <>
      <AuroraBackground />
      <Navbar variant="thankyou" />
      <ScrollEngine />

      <main className="ty-shell" data-screen-label="Thank You">
        <div className="crumbs">
          <span>{c.crumbs[0]}</span>
          <span className="dot">·</span>
          <span>{c.crumbs[1]}</span>
          <span className="dot">·</span>
          <span className="active">{c.crumbs[2]}</span>
        </div>

        <div className="ty-eyebrow">
          // stripe payment success · session_id present
        </div>
        <div className="ty-eyebrow" style={{ marginTop: 6 }}>
          {y.eyebrow}
        </div>

        <h1 className="ty-title reveal">
          <span className="stagger-child">{y.title}</span>
        </h1>

        <p className="ty-sub reveal">
          <span className="stagger-child">{y.subtitle}</span>
        </p>

        <div className="ty-grid">
          <article className="ty-card">
            <h3>{y.usageTipsHeading}</h3>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.6,
                opacity: 0.78,
                marginBottom: 16,
              }}
            >
              {y.usageTipsBody}
            </p>
            <div className="ph-block">
              <span className="lbl">
                // placeholder · copy not yet provided by client
              </span>
              <span>Conseils d&apos;utilisation à insérer ici</span>
              <span style={{ opacity: 0.55 }}>
                do not invent copy · do not auto-fill
              </span>
            </div>
          </article>

          <article className="ty-card">
            <h3>{y.expertAccessHeading}</h3>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.6,
                opacity: 0.78,
                marginBottom: 16,
              }}
            >
              {y.expertAccessBody}
            </p>
            <div className="ph-block">
              <span className="lbl">// placeholder · access detail pending</span>
              <span>Accès accompagnement expert à insérer ici</span>
              <span style={{ opacity: 0.55 }}>
                do not invent copy · do not auto-fill
              </span>
            </div>
          </article>
        </div>

        <section className="ty-order" aria-label={y.orderSummaryAriaLabel}>
          <h3>{y.orderSummaryHeading}</h3>

          <div className="row">
            <div>
              <div className="name">SKIN RECOVERY PATCH™</div>
              <div style={{ fontSize: 11, opacity: 0.65, marginTop: 4 }}>
                {y.quantity}
              </div>
            </div>
            <div className="price">// pulled server-side</div>
          </div>

          <div className="row">
            <div>
              <div className="name">+ TISSUE REPAIR CREAM™</div>
              <div style={{ fontSize: 11, opacity: 0.65, marginTop: 4 }}>
                {y.bumpAdded}
              </div>
            </div>
            <div className="price">// pulled server-side</div>
          </div>

          <div className="row">
            <div>
              <div className="name">{c.shippingName}</div>
              <div style={{ fontSize: 11, opacity: 0.65, marginTop: 4 }}>
                {c.shippingMeta}
              </div>
            </div>
            <div className="price">// pulled server-side</div>
          </div>

          <div className="total">
            <span className="lbl">{y.totalPaid}</span>
            <span className="amt">// pulled server-side</span>
          </div>

          <div className="ty-session">
            // session_id · {"{req.query.session_id}"} · server-side fetch only
          </div>
        </section>

        <div className="ty-cta-row">
          <a className="cta" href="#" data-href-placeholder="SRP-protocol-url">
            {y.discoverProtocol}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
          <Link className="cta ghost" href="/">
            {y.backToExperience}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>

        <div className="dev-note">
          // back-navigation guard · sessionStorage.setItem(&apos;ty_seen&apos;,
          sessionId)
          <br />
          // on popstate or browser back → redirect to &apos;/&apos; rather than
          re-render TY page
          <br />
          // server-side fetch of stripe session items + total · never client-side
          <br />
          // hard blockers · usage instructions copy · expert access copy
        </div>
      </main>

      <Footer />
    </>
  );
}

export default function ThankYouClient() {
  return (
    <Suspense>
      <ThankYouContent />
    </Suspense>
  );
}
