"use client";

import { useState } from "react";
import AuroraBackground from "@/components/AuroraBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollEngine from "@/components/ScrollEngine";
import { useLanguage } from "@/context/LanguageContext";

export default function CheckoutClient() {
  const { t } = useLanguage();
  const c = t.checkout;
  const [state, setState] = useState<"a" | "b">("a");
  const isA = state === "a";

  return (
    <>
      <AuroraBackground />
      <Navbar variant="checkout" />
      <ScrollEngine />

      <main className="checkout-shell" data-screen-label="Checkout">
        <div className="crumbs">
          <span>{c.crumbs[0]}</span>
          <span className="dot">·</span>
          <span className="active">{c.crumbs[1]}</span>
          <span className="dot">·</span>
          <span>{c.crumbs[2]}</span>
        </div>

        <h1 className="checkout-heading">{c.heading}</h1>
        <p className="checkout-sub">{c.sub}</p>

        <div className="trust-strip" aria-label={c.trustAriaLabel}>
          <div className="trust">
            <span className="badge" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
              </svg>
            </span>
            <span>{c.trust[0]}</span>
          </div>
          <div className="trust">
            <span className="badge" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M3 7h13l2 4h3v6h-2a2 2 0 11-4 0H10a2 2 0 11-4 0H3z" />
              </svg>
            </span>
            <span>{c.trust[1]}</span>
          </div>
          <div className="trust">
            <span className="badge" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M4 6h16M4 12h10M4 18h16" />
              </svg>
            </span>
            <span>{c.trust[2]}</span>
          </div>
          <div className="trust">
            <span className="badge" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6" />
              </svg>
            </span>
            <span>{c.trust[3]}</span>
          </div>
        </div>

        <div className="state-toggle" role="tablist" aria-label={c.stateToggleAriaLabel}>
          <button
            id="state-a"
            className={isA ? "active" : ""}
            role="tab"
            aria-selected={isA}
            type="button"
            onClick={() => setState("a")}
          >
            {c.stateA}
          </button>
          <button
            id="state-b"
            className={!isA ? "active" : ""}
            role="tab"
            aria-selected={!isA}
            type="button"
            onClick={() => setState("b")}
          >
            {c.stateB}
          </button>
        </div>

        <div className="checkout-grid">
          <div className="checkout-form">
            <section className="form-card">
              <h3>{c.expressPaymentHeading}</h3>
              <div className="wallets" aria-label={c.expressPaymentHeading}>
                <button className="wallet-btn dark" type="button" aria-label="Apple Pay (placeholder)">
                  <span className="glyph" aria-hidden="true" /> Apple Pay
                </button>
                <button className="wallet-btn light" type="button" aria-label="Google Pay (placeholder)">
                  <span
                    className="glyph"
                    style={{ background: "var(--silver-blue)" }}
                    aria-hidden="true"
                  />{" "}
                  Google Pay
                </button>
              </div>
              <div className="ph-banner">
                // stripe payment request button — render via stripe.paymentRequest()
              </div>
              <div className="divider-or">
                <span>{c.orCard}</span>
              </div>

              <div className="field">
                <label htmlFor="email">{c.emailLabel}</label>
                <input id="email" type="email" placeholder={c.emailPlaceholder} autoComplete="email" />
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="fn">{c.firstNameLabel}</label>
                  <input id="fn" type="text" autoComplete="given-name" />
                </div>
                <div className="field">
                  <label htmlFor="ln">{c.lastNameLabel}</label>
                  <input id="ln" type="text" autoComplete="family-name" />
                </div>
              </div>

              <div className="field">
                <label>{c.cardNumberLabel}</label>
                <div className="stripe-mock" aria-label="Stripe Elements card mock">
                  <span className="ph-cc">•••• •••• •••• ••••</span>
                  <div className="cards" aria-hidden="true">
                    <span className="cardchip" />
                    <span className="cardchip" />
                    <span className="cardchip" />
                  </div>
                </div>
                <div className="field-row" style={{ marginTop: 12 }}>
                  <div className="field" style={{ margin: 0 }}>
                    <label>{c.expirationLabel}</label>
                    <div className="stripe-mock">
                      <span className="ph-cc">MM / AA</span>
                    </div>
                  </div>
                  <div className="field" style={{ margin: 0 }}>
                    <label>{c.cvcLabel}</label>
                    <div className="stripe-mock">
                      <span className="ph-cc">•••</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="stripe-error visible" id="stripe-error-design" role="alert">
                <span className="err-dot" aria-hidden="true" />
                <div>
                  <strong style={{ fontFamily: "'Poppins',sans-serif", fontSize: 13, letterSpacing: "0.06em" }}>
                    {c.errorTitle}
                  </strong>
                  <div style={{ marginTop: 4, opacity: 0.78 }}>
                    {c.errorBody}
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      fontFamily: "var(--font-raleway), 'Raleway', sans-serif",
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      color: "var(--silver-blue)",
                      textTransform: "uppercase",
                    }}
                  >
                    // designed state — inline only, no redirect
                  </div>
                </div>
              </div>
            </section>

            <section className="form-card">
              <h3>{c.shippingHeading}</h3>
              <div className="field">
                <label htmlFor="addr">{c.addressLabel}</label>
                <input id="addr" type="text" autoComplete="street-address" />
              </div>
              <div className="field-row three">
                <div className="field">
                  <label htmlFor="zip">{c.postalCodeLabel}</label>
                  <input id="zip" type="text" autoComplete="postal-code" />
                </div>
                <div className="field">
                  <label htmlFor="city">{c.cityLabel}</label>
                  <input id="city" type="text" autoComplete="address-level2" />
                </div>
                <div className="field">
                  <label htmlFor="country">{c.countryLabel}</label>
                  <select id="country" defaultValue={c.countries[0]}>
                    {c.countries.map((country) => (
                      <option key={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            <section className="form-card" id="bump-wrap" style={{ display: isA ? "" : "none" }}>
              <h3>{c.completeRitualHeading}</h3>
              <div className="ph-banner">// state a — order bump · pre-purchase</div>

              <label className="bump">
                <input type="checkbox" defaultChecked />
                <div className="bump-body">
                  <h4>{c.bumps[0].title}</h4>
                  <p>{c.bumps[0].desc}</p>
                  <div className="bump-price">// placeholder · prix client à fournir</div>
                </div>
              </label>

              <label className="bump">
                <input type="checkbox" />
                <div className="bump-body">
                  <h4>{c.bumps[1].title}</h4>
                  <p>{c.bumps[1].desc}</p>
                  <div className="bump-price">// placeholder · prix client à fournir</div>
                </div>
              </label>

              <label className="bump">
                <input type="checkbox" />
                <div className="bump-body">
                  <h4>{c.bumps[2].title}</h4>
                  <p>{c.bumps[2].desc}</p>
                  <div className="bump-price">// placeholder url · protocole complet</div>
                </div>
              </label>
            </section>
          </div>

          <aside>
            <div className="summary" aria-label={c.summaryAriaLabel}>
              <h3>{c.summaryHeading}</h3>

              <div className="summary-row">
                <div>
                  <div className="name">SKIN RECOVERY PATCH™</div>
                  <div className="meta">Recovery Lifestyle Innovation™ · 1×</div>
                </div>
                <div className="price">// prix placeholder</div>
              </div>

              <div className="summary-row" id="bump-summary" style={{ display: isA ? "" : "none" }}>
                <div>
                  <div className="name">+ TISSUE REPAIR CREAM™</div>
                  <div className="meta">Order bump · {c.bumpActivated}</div>
                </div>
                <div className="price">// prix placeholder</div>
              </div>

              <div className="summary-row">
                <div>
                  <div className="name">{c.shippingName}</div>
                  <div className="meta">{c.shippingMeta}</div>
                </div>
                <div className="price">// placeholder</div>
              </div>

              <div className="summary-total">
                <span className="lbl">{c.total}</span>
                <span className="amt">// total placeholder</span>
              </div>

              <button className="summary-cta" type="button">
                {c.payButton}
                <span
                  className="arrow"
                  style={{
                    background: "var(--silver-blue)",
                    color: "var(--snow)",
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                  }}
                >
                  →
                </span>
              </button>

              <div
                style={{
                  marginTop: 16,
                  fontFamily: "var(--font-raleway), 'Raleway', sans-serif",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  color: "rgba(236,235,233,0.55)",
                  textTransform: "uppercase",
                  lineHeight: 1.6,
                }}
              >
                // sku — pending · pack structure tbd
                <br />
                // single unit / pack / subscription
              </div>
            </div>

            <div className="dev-note">
              // hard blockers · product photography · price · sku · stripe access · upsell prices
              <br />
              // success → /merci?session_id=…
              <br />
              // failure → inline error · no redirect · no refresh
            </div>
          </aside>
        </div>

        <section
          className={`post-upsell${!isA ? " visible" : ""}`}
          id="state-b-block"
          aria-label={c.stateB}
        >
          <div className="eyebrow">
            // state b — post-purchase redirect page (after stripe success)
          </div>
          <h3>{c.postUpsellHeading}</h3>
          <p
            style={{
              marginTop: 12,
              fontSize: 14,
              lineHeight: 1.6,
              maxWidth: "62ch",
              color: "var(--cherry)",
              opacity: 0.82,
            }}
          >
            {c.postUpsellBody}
          </p>

          <div className="upsells">
            <div className="upsell-card">
              <div className="thumb" />
              <div className="name">TISSUE REPAIR CREAM™</div>
              <div className="ph-price">// placeholder prix</div>
              <button className="add" type="button">
                {c.upsellAddButton}
              </button>
            </div>
            <div className="upsell-card">
              <div className="thumb" />
              <div className="name">DAY &amp; NIGHT COLLAGEN™</div>
              <div className="ph-price">// placeholder prix</div>
              <button className="add" type="button">
                {c.upsellAddButton}
              </button>
            </div>
            <div className="upsell-card">
              <div className="thumb" />
              <div className="name">{c.fullProtocolName}</div>
              <div className="ph-price">// placeholder url</div>
              <button className="add" type="button">
                {c.upsellDiscoverButton}
              </button>
            </div>
          </div>

          <button className="cta ghost" style={{ marginTop: 26 }} type="button">
            {c.continueButton}
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </button>
        </section>
      </main>

      <Footer />
    </>
  );
}
