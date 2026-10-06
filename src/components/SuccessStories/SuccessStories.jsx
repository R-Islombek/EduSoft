import { useEffect, useMemo, useRef, useState } from "react";
import "./SuccessStories.css";

// Rasmlarni import qilish
import abdujabborImg from "./images/abdujabbor.jpg";
import izzatbekImg from "./images/izzatbek.jpg";
import muhammadAliImg from "./images/muhammadAli.jpg";
import otabekImg from "./images/otabek.jpg";
import shohijahonImg from "./images/shohijahon.jpg";
import sitoraImg from "./images/sitora.jpg";

const SUCCESS_STORIES = [
  {
    id: "elbek",
    name: "Elbek",
    role: "Frontend dasturchi",
    company: "TenzorSoft",
    date: "9 Mart",
    quote: "Islom aka, TenzorSoftga ishga olishdi. Bergan bilimlaringizga rozi bo'ling, rahmat ustoz!",
    image: muhammadAliImg,
  },
  {
    id: "abdujabbor",
    name: "Abdujabbor",
    role: "Frontend dasturchi",
    company: "TenzorSoft",
    date: "7 Mart",
    quote: "Assalomu alaykum, bugun suhbat qilgandi stajirovkaga olishdi. Ancha yordamiz tegdi, rahmat kattakon!",
    image: abdujabborImg,
  },
  {
    id: "otabek",
    name: "Otabek",
    role: "Frontend dasturchi",
    company: "TenzorSoft",
    date: "7 Mart",
    quote: "Rahmat ustoz, sizni hissangiz katta. Otabek ham bugun TenzorSoftga kirdi ishga!",
    image: otabekImg,
  },
  {
    id: "muhammad",
    name: "Muxammed Ali",
    role: "Frontend dasturchi",
    company: "IT Kompaniya",
    date: "30 Aprel",
    quote: "Bugun suhbatga bordim, ishga qabul qilishdi ertadan ishga chiqyapman. Bergan bilimlaringizga rozi bo'ling rahmat ustoz!",
    image: muhammadAliImg,
  },
  {
    id: "shoxijahon",
    name: "Shoxijahon",
    role: "Yordamchi ustoz",
    company: "Coddy Camp",
    date: "10 Oktyabr",
    quote: "Suhbat yaxshi bo'ldi, Coddy Camp o'quv markaziga yordamchi ustoz bo'lib o'qishga kirdim. Bergan bilimingiz uchun rahmat!",
    image: shohijahonImg,
  },
  {
    id: "zilola",
    name: "Zilola",
    role: "Frontend dasturchi",
    company: "IT Kompaniya",
    date: "Yaqinda",
    quote: "Ustoz qabul qilishdi ishga! Rahmat bergan bilimizga, 24 soat ichida bog'lanamiz.",
    image: sitoraImg,
  },
];

const ALL = "Barchasi";

/* Kompaniya nomidan barqaror rang (hue) hosil qiladi */
const hueOf = (text) => [...text].reduce((h, c) => (h * 31 + c.charCodeAt(0)) % 360, 7);

const DoubleCheck = () => (
  <svg width="18" height="12" viewBox="0 0 28 18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 9.5l5 5L17 3.5" />
    <path d="M12 12.5l2.5 2.5L25 3.5" />
  </svg>
);

const TelegramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M21.9 3.3a1 1 0 0 0-1-.2L2.7 10.2a1 1 0 0 0 .1 1.9l4.6 1.5 1.8 5.6a1 1 0 0 0 1.7.4l2.5-2.6 4.6 3.4a1 1 0 0 0 1.6-.6l3.3-15.6a1 1 0 0 0-.7-1Z" />
  </svg>
);

const StoryPhoto = ({ src, name, hue }) => {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className="story__fallback" style={{ "--hue": hue }} aria-hidden="true">
        {name.charAt(0)}
      </div>
    );
  }
  return <img src={src} alt={name} loading="lazy" onError={() => setFailed(true)} />;
};

const SuccessStories = () => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(ALL);

  /* Bo'lim ko'ringanda animatsiya boshlanadi */
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const filters = useMemo(() => {
    const counts = SUCCESS_STORIES.reduce((acc, s) => {
      acc[s.company] = (acc[s.company] || 0) + 1;
      return acc;
    }, {});
    return [
      { label: ALL, count: SUCCESS_STORIES.length },
      ...Object.entries(counts).map(([label, count]) => ({ label, count })),
    ];
  }, []);

  const visible = active === ALL ? SUCCESS_STORIES : SUCCESS_STORIES.filter((s) => s.company === active);

  return (
    <section id="success-stories" ref={ref} className={`stories ${inView ? "is-in" : ""}`}>
      <div className="stories__container">
        {/* Sarlavha */}
        <div className="stories__top">
          <div className="stories__badge">
            <span className="stories__dot" />
            Bitiruvchilar natijasi
          </div>
          <h2 className="stories__heading">Ishga kirgan o'quvchilarimizdan samimiy e'tiroflar</h2>
          <p className="stories__sub">
            EduSoft'da olgan bilimlarini amalda qo'llab, ilk ish joyiga ega bo'lgan o'quvchilarimizning xabarlari.
          </p>

          <div className="stories__filters" role="group" aria-label="Kompaniya bo'yicha saralash">
            {filters.map((f) => (
              <button
                key={f.label}
                type="button"
                className={`chip ${active === f.label ? "is-active" : ""}`}
                aria-pressed={active === f.label}
                onClick={() => setActive(f.label)}
              >
                {f.label}
                <span className="chip__count">{f.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Kartochkalar */}
        <div className="stories__grid" key={active}>
          {visible.map((item, i) => {
            const hue = hueOf(item.company);
            return (
              <article className="story" key={item.id} style={{ "--d": i, "--hue": hue }}>
                <div className="story__media">
                  <StoryPhoto src={item.image} name={item.name} hue={hue} />
                  <span className="story__company">
                    <i aria-hidden="true" />
                    {item.company}
                  </span>
                  <div className="story__who">
                    <h3>{item.name}</h3>
                    <p>{item.role}</p>
                  </div>
                </div>

                <div className="story__body">
                  <div className="bubble">
                    <p>{item.quote}</p>
                    <span className="bubble__meta">
                      {item.date}
                      <DoubleCheck />
                    </span>
                  </div>
                </div>

                <footer className="story__footer">
                  <span className="verified">
                    <TelegramIcon />
                    Real Telegram xabar
                  </span>
                </footer>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;