"use client";

import { useLanguage } from "@/context/LanguageContext";
import type { Lang } from "@/lib/translations";

const LANGS: Lang[] = ["fr", "en", "es"];

type LanguageSwitcherProps = {
  className?: string;
};

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      className={["topbar-lang", className].filter(Boolean).join(" ")}
      aria-label="Language switcher"
    >
      {LANGS.map((code, i) => (
        <span key={code} style={{ display: "contents" }}>
          {i > 0 ? <span className="topbar-lang__sep" aria-hidden="true">/</span> : null}
          <button
            type="button"
            className={`topbar-lang__btn${lang === code ? " topbar-lang__btn--active" : ""}`}
            onClick={() => setLang(code)}
            aria-pressed={lang === code}
          >
            {code.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
