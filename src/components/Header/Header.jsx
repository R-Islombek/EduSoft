import { useState, useEffect } from "react";
import "./Header.css";

const LINKS = [
  { id: "top", label: "Бош саҳифа" },
  { id: "courses", label: "Курслар" },
  { id: "mentors", label: "Менторлар" },
  { id: "about", label: "Биз ҳақимизда" },
  { id: "contact", label: "Алоқа" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
  }, [open]);

  const handleNav = (id) => {
    setOpen(false);
    setActiveSection(id);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container site-header__row">
        
        {/* Logotip */}
        <a
          href="#top"
          className="site-header__logo"
          onClick={(e) => {
            e.preventDefault();
            handleNav("top");
          }}
        >
          <div className="logo-icon">
            <svg width="36" height="24" viewBox="0 0 36 24" fill="none">
              <path d="M0 0L14 12L0 24H8L22 12L8 0H0Z" fill="#0F172A" />
              <path d="M14 0L28 12L14 24H22L36 12L22 0H14Z" fill="#4F46E5" />
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-title">EDUSOFT</span>
            <span className="logo-sub">IT AKADEMIYASI</span>
          </div>
        </a>

        <div 
          className={`site-header__overlay ${open ? "is-open" : ""}`} 
          onClick={() => setOpen(false)} 
        />

        <nav className={`site-header__nav ${open ? "is-open" : ""}`}>
          <div className="site-header__nav-inner">
            {LINKS.map((link, index) => (
              <div key={link.id} className="nav-item-wrapper">
                <button
                  className={`site-header__link ${activeSection === link.id ? "is-active" : ""}`}
                  onClick={() => handleNav(link.id)}
                >
                  {link.label}
                </button>
                {index < LINKS.length - 1 && <span className="nav-divider">/</span>}
              </div>
            ))}
          </div>
        </nav>

        <div className="site-header__actions">
          <button className="btn-consult" onClick={() => handleNav("contact")}>
            Бепул маслаҳат
          </button>
          
          <button
            className={`site-header__burger ${open ? "is-open" : ""}`}
            aria-label="Menyu"
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;