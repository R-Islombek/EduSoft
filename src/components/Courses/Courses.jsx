import "./Courses.css";

const COURSES = [
  {
    accent: "violet",
    level: "Dasturlash",
    title: "Dasturlash asoslari",
    desc: "Algoritmik fikrlash, dasturlashning umumiy mantig'i va birinchi loyihalaringiz — keyingi yo'nalishlar uchun mustahkam poydevor.",
    duration: "6 hafta",
    tags: ["Algoritmlar", "Git", "Loyihalash asoslari"],
  },
  {
    accent: "coral",
    level: "Frontend",
    title: "Frontend: React & Next.js",
    desc: "HTML, CSS'dan React va Next.js'gacha — interfeys qurish, komponentlar va server renderingni amaliyotda o'rganasiz.",
    duration: "10 hafta",
    tags: ["React.js", "Next.js", "TypeScript"],
  },
  {
    accent: "teal",
    level: "Backend",
    title: "Backend: Node.js",
    desc: "Server, API va ma'lumotlar bazasi bilan ishlash — frontendni real loyihaga ulaydigan backend qismini quramiz.",
    duration: "10 hafta",
    tags: ["Node.js", "Express", "REST API"],
  },
  {
    accent: "yellow",
    level: "Matematika",
    title: "Dasturchi uchun matematika",
    desc: "Algoritmlar va dasturlashda kerak bo'ladigan matematik asoslar — mantiq, murakkablik va masalalarni yechish ko'nikmasi.",
    duration: "8 hafta",
    tags: ["Mantiq", "Algoritm murakkabligi"],
  },
  {
    accent: "violet",
    level: "Til",
    title: "IT uchun ingliz tili",
    desc: "Texnik hujjatlarni o'qish, xalqaro jamoada ishlash va ish suhbatiga tayyorgarlik uchun amaliy ingliz tili.",
    duration: "8 hafta",
    tags: ["Texnik lug'at", "Speaking", "Interview prep"],
  },
];

const Courses = () => {
  return (
    <section id="courses" className="courses">
      <div className="container">
        <p className="eyebrow" data-aos="fade-up">Yo'nalishlar</p>
        <h2 className="section-heading" data-aos="fade-up">Bizning kurslarimiz</h2>
        <p className="section-sub" data-aos="fade-up">
          Beshta yo'nalish — har biri amaliy loyiha bilan yakunlanadi va
          keyingi bosqichga tayyorlaydi.
        </p>

        <div className="courses__grid">
          {COURSES.map((c, i) => (
            <article
              className={`course-card course-card--${c.accent}`}
              key={c.title}
              data-aos="fade-up"
              data-aos-delay={i * 80}
            >
              <div className="course-card__top">
                <span className="course-card__level">{c.level}</span>
                <span className="course-card__duration">{c.duration}</span>
              </div>
              <h3 className="course-card__title">{c.title}</h3>
              <p className="course-card__desc">{c.desc}</p>
              <div className="course-card__tags">
                {c.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;
