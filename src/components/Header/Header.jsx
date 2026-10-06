import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import "./Header.css";

const LINKS = [
  { id: "top", label: "Бош саҳифа" },
  { id: "courses", label: "Курслар" },
  { id: "mentors", label: "Менторлар" },
  { id: "about", label: "Биз ҳақимизда" },
  { id: "contact", label: "Алоқа" },
];

const HEADER_OFFSET = 96;

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("top");
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false });

  const navRef = useRef(null);
  const linkRefs = useRef({});
  const lockUntil = useRef(0); // scroll-spy'ni bosish paytida to'xtatib turadi

  /* ---------- Scroll: holat + progress ---------- */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 20);
      setProgress(max > 0 ? Math.min(y / max, 1) : 0);
      if (y < 80 && performance.now() > lockUntil.current) setActiveSection("top");
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* ---------- Scroll-spy: ko'rinib turgan bo'limni aniqlaydi ---------- */
  useEffect(() => {
    const targets = LINKS.filter((l) => l.id !== "top")
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (performance.now() < lockUntil.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  /* ---------- Sirpanuvchi indikator o'rni ---------- */
  const measure = useCallback(() => {
    const el = linkRefs.current[activeSection];
    if (!el) return;
    setPill({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
  }, [activeSection]);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  /* ---------- Mobil menyu: scroll qulfi + Escape ---------- */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleNav = (id) => {
    setOpen(false);
    setActiveSection(id);
    lockUntil.current = performance.now() + 900;

    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET + 8;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-header__bar">
        <div className="site-header__row">
          {/* Logotip */}
          <a
            href="#top"
            className="site-header__logo"
            aria-label="EDUSOFT — бош саҳифа"
            onClick={(e) => {
              e.preventDefault();
              handleNav("top");
            }}
          >
            <span className="logo-icon" aria-hidden="true">
              <svg width="36" height="24" viewBox="0 0 36 24" fill="none">
                <path d="M0 0L14 12L0 24H8L22 12L8 0H0Z" fill="currentColor" />
                <path d="M14 0L28 12L14 24H22L36 12L22 0H14Z" fill="var(--brand-color)" />
              </svg>
            </span>
            <span className="logo-text">
              <span className="logo-title">EDUSOFT</span>
              <span className="logo-sub">IT akademiyasi</span>
            </span>
          </a>

          <div
            className={`site-header__overlay ${open ? "is-open" : ""}`}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <nav
            id="site-nav"
            className={`site-header__nav ${open ? "is-open" : ""}`}
            aria-label="Асосий меню"
          >
            <div className="site-header__nav-inner" ref={navRef}>
              <span
                className={`nav-pill ${pill.ready ? "is-ready" : ""}`}
                style={{ width: pill.width, transform: `translateX(${pill.left}px)` }}
                aria-hidden="true"
              />
              {LINKS.map((link, i) => (
                <button
                  key={link.id}
                  ref={(el) => (linkRefs.current[link.id] = el)}
                  className={`site-header__link ${activeSection === link.id ? "is-active" : ""}`}
                  style={{ "--i": i }}
                  aria-current={activeSection === link.id ? "true" : undefined}
                  onClick={() => handleNav(link.id)}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Mobil menyuda CTA shu yerda ko'rinadi */}
            <button className="btn-consult btn-consult--drawer" onClick={() => handleNav("contact")}>
              Бепул маслаҳат олиш
            </button>
          </nav>

          <div className="site-header__actions">
            <button className="btn-consult" onClick={() => handleNav("contact")}>
              <span>Бепул маслаҳат</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              className={`site-header__burger ${open ? "is-open" : ""}`}
              aria-label={open ? "Менюни ёпиш" : "Менюни очиш"}
              aria-expanded={open}
              aria-controls="site-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* O'qish progressi */}
        <span className="site-header__progress" style={{ transform: `scaleX(${progress})` }} />
      </div>
    </header>
  );
};

export default Header;
