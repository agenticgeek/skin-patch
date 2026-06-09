"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

type NavbarProps = {
  variant?: "home" | "checkout" | "thankyou";
};

const SHOPIFY_URL = "https://hmd0yd-ri.myshopify.com/products/skin-recovery-patch?variant=57317070733689";

export default function Navbar({ variant = "home" }: NavbarProps) {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.body.classList.add("nav-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("nav-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const onChange = () => {
      if (mq.matches) close();
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [close]);

  const brand = (
    <>
      METCARE<span className="sup">®</span>
    </>
  );

  const handleAnchor = (href: string) => {
    close();
    if (href.startsWith("#") && variant === "home") {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`topbar topbar--${variant}${open ? " topbar--open" : ""}`}
    >
      {variant === "home" ? (
        <div className="brand">{brand}</div>
      ) : (
        <Link className="brand" href="/" onClick={close}>
          {brand}
        </Link>
      )}

      <button
        type="button"
        className="topbar-menu-btn"
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={toggle}
      >
        <span className="visually-hidden">
          {open ? t.navbar.closeMenu : t.navbar.openMenu}
        </span>
        <span className="topbar-menu-icon" aria-hidden="true" />
      </button>

      <nav
        id="site-nav"
        className="topbar-nav"
        aria-label="Navigation principale"
      >
        <div className="topbar-nav__panel">
          {variant === "home" && (
            <ul className="topbar-nav__list">
              <li>
                <a href="#section-2" onClick={(e) => { e.preventDefault(); handleAnchor("#section-2"); }}>
                  {t.navbar.ritual}
                </a>
              </li>
              <li>
                <a href="#section-5" onClick={(e) => { e.preventDefault(); handleAnchor("#section-5"); }}>
                  {t.navbar.formulation}
                </a>
              </li>
              <li>
                <a className="topbar-nav__cta" href={SHOPIFY_URL} target="_blank" rel="noopener noreferrer" onClick={close}>
                  {t.navbar.order}
                </a>
              </li>
            </ul>
          )}

          {variant === "checkout" && (
            <ul className="topbar-nav__list">
              <li>
                <Link href="/" onClick={close}>
                  ← Retour à l&apos;accueil
                </Link>
              </li>
              <li>
                <Link className="topbar-nav__cta" href="/checkout" onClick={close}>
                  Paiement
                </Link>
              </li>
              <li>
                <span className="topbar-nav__muted">Paiement sécurisé · Stripe</span>
              </li>
            </ul>
          )}

          {variant === "thankyou" && (
            <ul className="topbar-nav__list">
              <li>
                <Link href="/" onClick={close}>
                  Accueil
                </Link>
              </li>
              <li>
                <span className="topbar-nav__muted">Commande confirmée</span>
              </li>
            </ul>
          )}
        </div>
      </nav>

      <nav className="topbar-right" aria-label="Navigation rapide">
        {variant === "home" && (
          <>
            <a href="#section-2" onClick={(e) => { e.preventDefault(); handleAnchor("#section-2"); }}>{t.navbar.ritual}</a>
            <a href="#section-5" onClick={(e) => { e.preventDefault(); handleAnchor("#section-5"); }}>{t.navbar.formulation}</a>
            <a href={SHOPIFY_URL} target="_blank" rel="noopener noreferrer">{t.navbar.order}</a>
          </>
        )}
        {variant === "checkout" && (
          <>
            <Link href="/">← Retour</Link>
            <span style={{ opacity: 0.55 }}>Paiement sécurisé</span>
          </>
        )}
        {variant === "thankyou" && (
          <span style={{ opacity: 0.55 }}>Confirmation</span>
        )}
        <div className="topbar-lang" aria-label="Language switcher">
          <button
            className={`topbar-lang__btn${lang === "fr" ? " topbar-lang__btn--active" : ""}`}
            onClick={() => setLang("fr")}
            aria-pressed={lang === "fr"}
          >
            FR
          </button>
          <span className="topbar-lang__sep" aria-hidden="true">/</span>
          <button
            className={`topbar-lang__btn${lang === "en" ? " topbar-lang__btn--active" : ""}`}
            onClick={() => setLang("en")}
            aria-pressed={lang === "en"
          }>
            EN
          </button>
        </div>
      </nav>

      <div
        className="topbar-backdrop"
        aria-hidden={!open}
        onClick={close}
      />
    </header>
  );
}
