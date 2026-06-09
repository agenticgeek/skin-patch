"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type NavbarProps = {
  variant?: "home" | "checkout" | "thankyou";
};

const SHOPIFY_URL = "https://hmd0yd-ri.myshopify.com/products/skin-recovery-patch?variant=57317070733689";

const HOME_LINKS = [
  { href: "#section-2", label: "Le rituel" },
  { href: "#section-5", label: "Formulation" },
  { href: SHOPIFY_URL, label: "Commander", isCta: true },
] as const;

export default function Navbar({ variant = "home" }: NavbarProps) {
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
          {open ? "Fermer le menu" : "Ouvrir le menu"}
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
              {HOME_LINKS.map((link) => (
                <li key={link.href}>
                  {"isCta" in link ? (
                    <a
                      className="topbar-nav__cta"
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={close}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleAnchor(link.href);
                      }}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
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
            <a href="#section-2">Le rituel</a>
            <a href="#section-5">Formulation</a>
            <a href={SHOPIFY_URL} target="_blank" rel="noopener noreferrer">Commander</a>
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
      </nav>

      <div
        className="topbar-backdrop"
        aria-hidden={!open}
        onClick={close}
      />
    </header>
  );
}
