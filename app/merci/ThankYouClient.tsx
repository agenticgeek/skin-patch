"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AuroraBackground from "@/components/AuroraBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollEngine from "@/components/ScrollEngine";

function ThankYouContent() {
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
          <span>Panier</span>
          <span className="dot">·</span>
          <span>Paiement</span>
          <span className="dot">·</span>
          <span className="active">Confirmation</span>
        </div>

        <div className="ty-eyebrow">
          // stripe payment success · session_id present
        </div>
        <div className="ty-eyebrow" style={{ marginTop: 6 }}>
          § Recovery Ritual™ — Confirmation
        </div>

        <h1 className="ty-title reveal">
          <span className="stagger-child">
            Bienvenue dans l&apos;expérience METCARE®.
          </span>
        </h1>

        <p className="ty-sub reveal">
          <span className="stagger-child">
            Votre Recovery Ritual™ commence maintenant.
          </span>
        </p>

        <div className="ty-grid">
          <article className="ty-card">
            <h3>Conseils d&apos;utilisation</h3>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.6,
                opacity: 0.78,
                marginBottom: 16,
              }}
            >
              Routine recovery lifestyle.
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
            <h3>Accès accompagnement expert METCARE®</h3>
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.6,
                opacity: 0.78,
                marginBottom: 16,
              }}
            >
              Votre lien direct vers l&apos;équipe METCARE® dans les phases de
              récupération.
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

        <section className="ty-order" aria-label="Récapitulatif commande">
          <h3>Récapitulatif de votre commande</h3>

          <div className="row">
            <div>
              <div className="name">SKIN RECOVERY PATCH™</div>
              <div style={{ fontSize: 11, opacity: 0.65, marginTop: 4 }}>
                Quantité · 1 — METCARE®
              </div>
            </div>
            <div className="price">// pulled server-side</div>
          </div>

          <div className="row">
            <div>
              <div className="name">+ TISSUE REPAIR CREAM™</div>
              <div style={{ fontSize: 11, opacity: 0.65, marginTop: 4 }}>
                Order bump · ajouté à la commande
              </div>
            </div>
            <div className="price">// pulled server-side</div>
          </div>

          <div className="row">
            <div>
              <div className="name">Livraison premium</div>
              <div style={{ fontSize: 11, opacity: 0.65, marginTop: 4 }}>
                Suivi & assistance
              </div>
            </div>
            <div className="price">// pulled server-side</div>
          </div>

          <div className="total">
            <span className="lbl">Total payé</span>
            <span className="amt">// pulled server-side</span>
          </div>

          <div className="ty-session">
            // session_id · {"{req.query.session_id}"} · server-side fetch only
          </div>
        </section>

        <div className="ty-cta-row">
          <a className="cta" href="#" data-href-placeholder="SRP-protocol-url">
            Découvrir le protocole complet SRP™
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </a>
          <Link className="cta ghost" href="/">
            Retour à l&apos;expérience METCARE®
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
