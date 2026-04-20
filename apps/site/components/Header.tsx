"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLanguage } from "@/lib/LanguageContext";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, languageHref, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setNavOpen(false);
  const homeAnchor = (id: string) => `/${language}/#${id}`;
  const getCleanHash = () => {
    const hash = window.location.hash;
    if (!hash) {
      return "";
    }

    const [firstHash] = hash.slice(1).split("#");
    return firstHash ? `#${firstHash}` : "";
  };

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${navOpen ? " nav-open" : ""}`} data-header>
      <nav className="nav-shell" aria-label="Primary navigation">
        <Link className="brand" href="/" aria-label={t.brandName}>
          <Image src="/images/logo-96.png" alt="" width={36} height={39} />
          <span>{t.brandName}</span>
        </Link>

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={navOpen}
          aria-controls="primary-nav"
          onClick={() => setNavOpen(!navOpen)}
        >
          <span className="sr-only">{t.openNav}</span>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>

        <div className={`nav-links${navOpen ? " is-open" : ""}`} id="primary-nav">
          <Link href="/products" onClick={close}>{t.nav.products}</Link>
          <Link href="/blog" onClick={close}>{t.nav.blog}</Link>
          <a href={homeAnchor("service")} onClick={close}>{t.nav.oem}</a>
          <a href={homeAnchor("why-us")} onClick={close}>{t.nav.whyUs}</a>
          <a href={homeAnchor("contact")} onClick={close}>{t.nav.contact}</a>
        </div>

        <a
          className="language-toggle"
          href={languageHref}
          onClick={(event) => {
            close();
            event.currentTarget.href = `${languageHref}${window.location.search}${getCleanHash()}`;
          }}
          aria-label={t.switchAria}
        >
          <span>{t.switchLabel}</span>
        </a>
      </nav>
    </header>
  );
}
