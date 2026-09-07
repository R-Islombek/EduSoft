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

const SuccessStories = () => {
  return (
    <section id="success-stories" className="success-stories">
      <div className="container">
        
        {/* Sarlavha qismi */}
        <div className="success-stories__top text-center" data-aos="fade-up">
          <div className="success-stories__eyebrow-badge">
            <span className="badge-dot" /> Bitiruvchilar Natijasi
          </div>
          <h2 className="section-heading">Ishga kirgan o'quvchilarimizdan samimiy e'tiroflar</h2>
          <p className="section-sub">
            EduSoft'da olgan bilimlarini amalda qo'llab, ilk ish joyiga ega bo'lgan o'quvchilarimizning xabarlari.
          </p>
        </div>

        {/* Kartochkalar gridi */}
        <div className="success-stories__grid">
          {SUCCESS_STORIES.map((item, index) => (
            <div 
              className="success-card" 
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Kartochka yuqori qismi: Avatar va Ma'lumot */}
              <div className="success-card__header">
                <div className="success-card__avatar-wrap">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="success-card__img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="success-card__avatar-fallback" style={{ display: 'none' }}>
                    {item.name.charAt(0)}
                  </div>
                </div>

                <div className="success-card__info">
                  <h3 className="success-card__name">{item.name}</h3>
                  <p className="success-card__role">
                    {item.role} 
                    {item.company && <span className="company-tag"> · {item.company}</span>}
                  </p>
                </div>

                <span className="success-card__date">{item.date}</span>
              </div>

              {/* Xabar matni (Chat bubble ko'rinishida) */}
              <div className="success-card__body">
                <div className="chat-bubble">
                  <p>"{item.quote}"</p>
                </div>
              </div>

              {/* Pastki Status qismi */}
              <div className="success-card__footer">
                <span className="verified-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Real Telegram xabar
                </span>
                <span className="chat-icon-indicator">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SuccessStories;