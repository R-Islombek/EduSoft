import { useEffect, useRef, useState } from "react";
import "./Mentors.css";

/* Yangi mentor qo'shish uchun shu ro'yxatga yana bitta obyekt qo'shing.
   Rasm:  public/mentors/islombek.jpg  — topilmasa bosh harflar ko'rinadi. */
const MENTORS = [
  {
    name: "Islombek",
    initials: "IB",
    photo: "/mentors/islombek.jpg",
    role: "Frontend Mentor",
    badge: "EduSoft asoschisi",
    bio: "2023-yildan beri frontend mentor sifatida faoliyat yuritadi: IT Time Academiyasida mentorlik qildi, so'ng Limsa kompaniyasida ham mentor, ham loyihalar ustida ishlab tajriba orttirdi. Hozirda shu tajribani EduSoft Akademiyasida o'quvchilarga uzatadi.",
    path: [
      { when: "2023", place: "IT Time Academiyasi", what: "Frontend mentor" },
      { when: "Keyin", place: "Limsa kompaniyasi", what: "Mentorlik va real loyihalar" },
      { when: "Hozir", place: "EduSoft Akademiyasi", what: "Asoschi va mentor" },
    ],
    stack: ["HTML5", "CSS/SASS", "JavaScript", "React.js", "Next.js", "TypeScript"],
  },
];

const POINTS = [
  { title: "Kod review", text: "Har bir topshiriq mentor ko'zidan o'tadi." },
  { title: "Shaxsiy fikr-mulohaza", text: "Kamchiliklar va o'sish nuqtalari ochiq aytiladi." },
];

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

const Avatar = ({ name, initials, photo }) => {
  const [state, setState] = useState("idle"); // idle | loaded | failed
  return (
    <div className="avatar" aria-hidden="true">
      <div className="avatar__inner">
        {state !== "loaded" && <span>{initials}</span>}
        {photo && state !== "failed" && (
          <img
            src={photo}
            alt=""
            className={state === "loaded" ? "is-loaded" : ""}
            onLoad={() => setState("loaded")}
            onError={() => setState("failed")}
          />
        )}
      </div>
    </div>
  );
};

const Mentors = () => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  /* Bo'lim ko'ringanda bir marta tartib bilan paydo bo'ladi */
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
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="mentors" ref={ref} className={`mentors ${inView ? "is-in" : ""}`}>
      <div className="mentors__container mentors__row">
        {/* Chap: kirish matni */}
        <div className="mentors__intro" data-r style={{ "--d": 0 }}>
          <p className="mentors__badge">Mentorlar</p>
          <h2 className="mentors__heading">Sizni real tajribaga ega mentor kuzatib boradi</h2>
          <p className="mentors__sub">
            EduSoft'da dars — bir tomonlama video emas. Har bir o'quvchi o'z mentoridan kod review va
            shaxsiy fikr-mulohaza oladi.
          </p>
          <ul className="mentors__points">
            {POINTS.map((p) => (
              <li key={p.title}>
                <span className="mentors__check">
                  <Check />
                </span>
                <span>
                  <strong>{p.title}</strong>
                  {p.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* O'ng: mentor kartasi + qo'shimcha bloklar */}
        <div className="mentors__col">
          {MENTORS.map((m) => (
            <article className="mentor-card" key={m.name} data-r style={{ "--d": 1 }}>
              <div className="mentor-card__glow" aria-hidden="true" />

              <header className="mentor-card__head">
                <Avatar name={m.name} initials={m.initials} photo={m.photo} />
                <div>
                  <h3>{m.name}</h3>
                  <p className="mentor-card__role">
                    {m.role}
                    <span className="mentor-card__badge">{m.badge}</span>
                  </p>
                </div>
              </header>

              <p className="mentor-card__bio">{m.bio}</p>

              <ol className="timeline" aria-label="Mentorlik yo'li">
                {m.path.map((step) => (
                  <li key={step.place}>
                    <span className="timeline__when">{step.when}</span>
                    <span className="timeline__body">
                      <strong>{step.place}</strong>
                      <span>{step.what}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="mentor-card__stack">
                {m.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </article>
          ))}

          <div className="mentors__duo">
            {/* Kod review namunasi */}
            <figure className="review" data-r style={{ "--d": 2 }} aria-label="Kod review namunasi">
              <figcaption className="review__top">
                <span className="review__file">Header.jsx</span>
                <span className="review__ok">
                  <Check /> Tasdiqlandi
                </span>
              </figcaption>
              <pre className="review__code" aria-hidden="true">
                <code>
                  <span className="ln"><i>12</i>{"useEffect(() => {"}</span>
                  <span className="ln add"><i>13</i>{'  window.addEventListener("scroll", onScroll);'}</span>
                  <span className="ln add"><i>14</i>{'  return () => window.removeEventListener("scroll", onScroll);'}</span>
                  <span className="ln"><i>15</i>{"}, []);"}</span>
                </code>
              </pre>
              <div className="review__comment">
                <span className="review__ava">{MENTORS[0].initials}</span>
                <p>Tozalash funksiyasi qo'shilgan — endi xotira oqishi bo'lmaydi. Yaxshi ish!</p>
              </div>
            </figure>

            {/* Yangi mentorlar */}
            <div className="mentor-invite" data-r style={{ "--d": 3 }}>
              <span className="mentor-invite__slot" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
              <h4>Jamoamiz kengaymoqda</h4>
              <p>EduSoft o'sib boryapti — tez orada yangi mentorlar qo'shiladi.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mentors;