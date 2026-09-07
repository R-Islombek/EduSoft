import "./Mentors.css";

const Mentors = () => {
  return (
    <section id="mentors" className="mentors">
      <div className="container mentors__row">
        <div className="mentors__intro" data-aos="fade-right">
          <p className="eyebrow">Mentorlar</p>
          <h2 className="section-heading">Sizni real tajribaga ega mentor kuzatib boradi</h2>
          <p className="section-sub">
            EduSoft'da dars — bir tomonlama video emas. Har bir o'quvchi
            o'z mentoridan kod review va shaxsiy fikr-mulohaza oladi.
          </p>
        </div>

        <div className="mentor-card" data-aos="fade-left">
          <div className="mentor-card__avatar" aria-hidden="true">IB</div>
          <div className="mentor-card__body">
            <h3>Islombek</h3>
            <p className="mentor-card__role">Frontend Mentor · EduSoft asoschisi</p>
            <p className="mentor-card__bio">
              2023-yildan beri frontend mentor sifatida faoliyat yuritadi:
              IT Time Academiyasida mentorlik qildi, so'ng Limsa kompaniyasida
              ham mentor, ham loyihalar ustida ishlab tajriba orttirdi.
              Hozirda shu tajribani EduSoft Akademiyasida o'quvchilarga uzatadi.
            </p>
            <div className="mentor-card__stack">
              {["HTML5", "CSS/SASS", "JavaScript", "React.js", "Next.js", "TypeScript"].map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mentor-invite" data-aos="fade-up">
          <h4>Jamoamiz kengaymoqda</h4>
          <p>EduSoft o'sib boryapti — tez orada yangi mentorlar qo'shiladi.</p>
        </div>
      </div>
    </section>
  );
};

export default Mentors;
