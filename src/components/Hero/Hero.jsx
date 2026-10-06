import { useEffect, useRef, useState } from "react";
import "./Hero.css";

const DIRECTIONS = ["Frontend", "Backend", "Full-Stack", "UI/UX", "Zamonaviy"];

const ORBIT_ITEMS = [
  { icon: "⚛️", label: "React" },
  { icon: "🔷", label: "TypeScript" },
  { icon: "🎨", label: "Tailwind" },
  { icon: "📐", label: "Matematika" },
  { icon: "🇬🇧", label: "Ingliz tili" },
  { icon: "🟢", label: "Node.js" },
  { icon: "🚀", label: "Next.js" },
];

const STATS = [
  { to: 4, suffix: " yil", label: "Amaliy tajriba" },
  { to: 100, suffix: "+", label: "Muvaffaqiyatli bitiruvchi" },
  { text: "TenzorSoft", label: "Bitiruvchilar ish joyi" },
  { text: "1:1", label: "Individual yondashuv" },
];

/* Barcha so'zlar bitta katakda ustma-ust turadi: sarlavha kengligi sakramaydi */
const RotatingWord = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % DIRECTIONS.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="hero__rotator">
      {DIRECTIONS.map((word, i) => (
        <span
          key={word}
          className={`hero__word ${i === index ? "is-on" : ""}`}
          aria-hidden={i !== index}
        >
          {word}
        </span>
      ))}
    </span>
  );
};

/* Logotiplarni  public/logos/  papkasiga shu nomlar bilan qo'ying.
   Fayl topilmasa, avtomatik bosh harfli rangli belgi ko'rinadi. */
const COMPANIES = [
  { name: "TenzorSoft", type: "Kompaniya", logo: "/logos/tenzorsoft.png", hue: 243 },
  { name: "Imaan Tech", type: "Kompaniya", logo: "/logos/imaan-tech.png", hue: 160 },
  { name: "Zero One", type: "Kompaniya", logo: "/logos/zero-one.png", hue: 222 },
  { name: "Great Soft", type: "Kompaniya", logo: "/logos/great-soft.png", hue: 28 },
  { name: "PDP School", type: "Akademiya", logo: "/logos/pdp-school.png", hue: 262 },
  { name: "Coddy Camp", type: "Akademiya", logo: "/logos/coddy-camp.png", hue: 190 },
  { name: "IT School", type: "Maktab", logo: "/logos/it-school.png", hue: 340 },
  { name: "Respect Education", type: "Ta'lim markazi", logo: "/logos/respect-education.png", hue: 120 },
  { name: "KapitalBank", type: "Bank", logo: "/logos/kapitalbank.png", hue: 8 },
];

const CompanyLogo = ({ name, src, hue }) => {
  const [state, setState] = useState("idle"); // idle | loaded | failed
  const mono = (name.match(/[A-Z]/g) || [name[0]]).slice(0, 2).join("");

  return (
    <span className="co-logo" style={{ "--hue": hue }}>
      {state !== "loaded" && <span className="co-logo__mono">{mono}</span>}
      {src && state !== "failed" && (
        <img
          src={src}
          alt=""
          loading="lazy"
          className={state === "loaded" ? "is-loaded" : ""}
          onLoad={() => setState("loaded")}
          onError={() => setState("failed")}
        />
      )}
    </span>
  );
};

/* Uzluksiz aylanuvchi lenta: ro'yxat ikki marta takrorlanadi */
const CompanyMarquee = () => {
  const list = [...COMPANIES, ...COMPANIES];
  return (
    <div className="marquee" role="region" aria-label="O'quvchilarimiz ishga kirgan kompaniyalar">
      <div className="marquee__track">
        {[0, 1].map((g) => (
          <ul className="marquee__group" key={g} aria-hidden={g === 1}>
            {list.map((c, i) => (
              <li className="co-card" key={`${g}-${i}`} aria-hidden={i >= COMPANIES.length}>
                <CompanyLogo name={c.name} src={c.logo} hue={c.hue} />
                <span className="co-card__text">
                  <strong>{c.name}</strong>
                  <span>{c.type}</span>
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

/* Ko'ringanda 0 dan sanab chiqadi */
const CountUp = ({ to, suffix = "" }) => {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(to);
      return;
    }
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1400;
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1);
          setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
};

const Hero = () => {
  const heroRef = useRef(null);

  /* Kursor ortidan yuruvchi yorug'lik (faqat sichqonchali qurilmalarda) */
  const handleMove = (e) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const step = 360 / ORBIT_ITEMS.length;

  return (
    <section id="top" className="hero" ref={heroRef} onMouseMove={handleMove}>
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__aurora hero__aurora--a" />
        <div className="hero__aurora hero__aurora--b" />
        <div className="hero__grid" />
        <div className="hero__spotlight" />
      </div>

      <div className="hero__container hero__row">
        {/* Matn */}
        <div className="hero__text">
          <div className="hero__badge">
            <span className="badge-dot" />
            80% Amaliyot / 20% Nazariya
          </div>

          <h1 className="hero__title">
            <RotatingWord /> dasturlashni real loyihalar orqali o'rganing
          </h1>

          <p className="hero__desc">
            Frontend (React, Next.js), Backend (Node.js) va boshqa yo'nalishlarda tajribali
            mentorlar kuzatuvida noldan IT kompaniyalargacha bo'lgan yo'lni bosib o'ting.
          </p>

          <div className="hero__actions">
            <a href="#pricing" className="btn btn-primary">
              <span>Kursni tanlash</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14m-7-7l7 7-7 7" />
              </svg>
            </a>
            <a href="#courses" className="btn btn-outline">
              Yo'nalishlarni ko'rish
            </a>
          </div>
        </div>

        {/* Orbita */}
        <div className="hero__visual" aria-hidden="true">
          <div className="orbit-container">
            <div className="orbit-inner">
              {[0, 1, 2].map((n) => (
                <div key={n} className="orbit-slot orbit-slot--inner" style={{ "--a": `${n * 120 + 30}deg` }}>
                  <span className="orbit-dot" />
                </div>
              ))}
            </div>

            <div className="orbit-ring">
              {ORBIT_ITEMS.map((item, i) => (
                <div key={item.label} className="orbit-slot" style={{ "--a": `${-90 + i * step}deg` }}>
                  <div className="orbit-unrotate">
                    <div className="orbit-item">
                      <span className="orbit-item__icon">{item.icon}</span>
                      {item.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="orbit-center">
              <div className="orbit-center__glow" />
              <span className="orbit-center__text">EDUSOFT</span>
              <span className="orbit-center__sub">ACADEMY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ishga kirgan o'quvchilarimiz */}
      <div className="hero__companies">
        <h2 className="hero__companies-title">Ishga kirgan o'quvchilarimiz kompaniyalari</h2>
        <CompanyMarquee />
      </div>

      {/* Statistika */}
      <div className="hero__container hero__stats">
        <div className="stats-panel">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <strong>{s.text ?? <CountUp to={s.to} suffix={s.suffix} />}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
