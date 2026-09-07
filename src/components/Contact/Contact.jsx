import { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ 
    name: "", 
    phone: "", 
    course: "Frontend (React, Next.js)", 
    message: "" 
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Bu yerga Telegram bot yoki backend yuborish logikasi ulanadi
    setSent(true);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact__panel">
          
          {/* Chap tomon: Ma'lumotlar va Info */}
          <div className="contact__intro">
            <div className="contact__eyebrow-badge">
              <span className="badge-dot" /> Aloqa
            </div>
            <h2>Birinchi qadamni bugun tashlang</h2>
            <p>
              Ma'lumotlaringizni qoldiring — qaysi kurs sizga mos ekanini
              birgalikda aniqlaymiz va 24 soat ichida bog'lanamiz.
            </p>

            <ul className="contact__details">
              <li>
                <div className="contact__icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <span>Telefon raqam</span>
                  <a href="tel:+998942750097">+998 94 275 00 97</a>
                </div>
              </li>
              <li>
                <div className="contact__icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 2L2 9.5l8 3.5m11.5-9L11 13m10.5-11L15 22l-5-9-8-3.5 19.5-7.5z"/></svg>
                </div>
                <div>
                  <span>Telegram kanal / admin</span>
                  <a href="https://t.me/edusoft_admin" target="_blank" rel="noopener noreferrer">@edusoft_admin</a>
                </div>
              </li>
              <li>
                <div className="contact__icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <span>Manzil</span>
                  <a href="#contact">Toshkent shahri</a>
                </div>
              </li>
            </ul>
          </div>

          {/* O'ng tomon: Forma yoki Muvaffaqiyat oynasi */}
          <div className="contact__form-wrap">
            {sent ? (
              <div className="contact__success">
                <div className="success-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3>Rahmat, so'rovingiz qabul qilindi!</h3>
                <p>Tez orada mutaxassislarimiz siz bilan bog'lanishadi.</p>
                <button 
                  type="button" 
                  className="btn-primary reset-btn" 
                  onClick={() => setSent(false)}
                >
                  Yana ariza yuborish
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Ismingiz</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name" 
                    required 
                    value={form.name} 
                    onChange={handleChange} 
                    placeholder="Masalan: Anvar" 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Telefon raqam</label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone" 
                    required 
                    value={form.phone} 
                    onChange={handleChange} 
                    placeholder="+998 90 123 45 67" 
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="course">Qaysi kursga qiziqasiz?</label>
                  <select id="course" name="course" value={form.course} onChange={handleChange}>
                    <option>Frontend (React, Next.js)</option>
                    <option>Backend (Node.js)</option>
                    <option>Full-Stack Dasturlash</option>
                    <option>Dasturlash asoslari</option>
                    <option>UI/UX Dizayn</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Xabar (ixtiyoriy)</label>
                  <textarea 
                    id="message"
                    name="message" 
                    rows="3" 
                    value={form.message} 
                    onChange={handleChange} 
                    placeholder="Qo'shimcha savollaringiz bo'lsa yozing..." 
                  />
                </div>

                <button type="submit" className="btn-primary contact__submit">
                  Ariza yuborish
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;