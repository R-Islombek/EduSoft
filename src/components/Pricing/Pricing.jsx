import "./Pricing.css";

const PLANS = [
  {
    name: "Guruh",
    price: "800 000",
    period: "/oy",
    desc: "Guruh darslari, uy vazifalari va haftalik kod review bilan izchil o'rganish.",
    features: [
      "Haftasiga 3 ta jonli dars",
      "Uy vazifasi tekshiruvi",
      "Guruh chatida yordam",
      "Kurs oxirida sertifikat"
    ],
    cta: "Guruhga qo'shilish",
    featured: false,
  },
  {
    name: "Mentorlik",
    price: "1 000 000",
    period: "/oy",
    desc: "Guruh darsi + shaxsiy mentor: kodingiz haftada bir marta birma-bir ko'rib chiqiladi.",
    features: [
      "Guruh rejasidagi hammasi",
      "Haftalik 1:1 mentor uchrashuvi",
      "Portfolio loyihasi bo'yicha yo'riqnoma",
      "Ish qidiruvda maslahat"
    ],
    cta: "Mentorlikni tanlash",
    featured: true,
  },
  {
    name: "Individual",
    price: "Kelishilgan",
    period: "",
    desc: "To'liq shaxsiy dastur — jadval, tezlik va mavzular sizga moslashtiriladi.",
    features: [
      "Moslashuvchan jadval",
      "Faqat siz uchun dastur",
      "Real loyiha ustida hamkorlik",
      "To'g'ridan-to'g'ri aloqa"
    ],
    cta: "Bog'lanish",
    featured: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="pricing">
      <div className="container">
        
        {/* Sarlavha qismi */}
        <div className="pricing__header">
          <div className="pricing__eyebrow-badge">
            <span className="badge-dot" /> Narxlar va Rejalar
          </div>
          <h2 className="section-heading">O'zingizga mos formatni tanlang</h2>
          <p className="section-sub">
            Har uchala reja ham amaliy loyihalar va mentor fikr-mulohazasini o'z ichiga oladi.
          </p>
        </div>

        {/* Kartochkalar gridi */}
        <div className="pricing__grid">
          {PLANS.map((p, i) => (
            <div
              className={`plan-card ${p.featured ? "plan-card--featured" : ""}`}
              key={p.name}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {p.featured && (
                <div className="plan-card__badge">Ko'p tanlanadi</div>
              )}
              
              <div className="plan-card-top">
                <h3 className="plan-card__name">{p.name}</h3>
                <p className="plan-card__desc">{p.desc}</p>
              </div>

              <div className="plan-card__price-box">
                <span className="plan-card__price">{p.price}</span>
                {p.period && <span className="plan-card__period">{p.period}</span>}
              </div>

              <ul className="plan-card__features">
                {p.features.map((f) => (
                  <li key={f} className="plan-feature-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a 
                href="#contact" 
                className={`plan-btn ${p.featured ? "plan-btn--primary" : "plan-btn--outline"}`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Pricing;