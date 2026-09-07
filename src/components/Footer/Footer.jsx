import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container site-footer__row">
        <div className="site-footer__brand">
          <p className="site-footer__logo">Edu<span>Soft</span></p>
          <p>Frontend dasturlashni amaliy loyihalar orqali o'rgatuvchi akademiya.</p>
        </div>

        <div className="site-footer__col">
          <h4>Kurslar</h4>
          <a href="#courses">HTML, CSS & SASS</a>
          <a href="#courses">JavaScript</a>
          <a href="#courses">React.js</a>
          <a href="#courses">Next.js & TypeScript</a>
        </div>

        <div className="site-footer__col">
          <h4>Akademiya</h4>
          <a href="#mentors">Mentorlar</a>
          <a href="#pricing">Narxlar</a>
          <a href="#testimonials">Fikrlar</a>
          <a href="#contact">Aloqa</a>
        </div>

        <div className="site-footer__col">
          <h4>Aloqa</h4>
          <a href="tel:+998900000000">+998 94 275 00 97</a>
          <a href="https://t.me/edusoft" target="_blank" rel="noopener noreferrer">Telegram</a>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <span>&copy; {new Date().getFullYear()} EduSoft Akademiyasi. Barcha huquqlar himoyalangan.</span>
      </div>
    </footer>
  );
};

export default Footer;
