import { useEffect, useState } from "react";
import "./Hero.css";

const DIRECTIONS = ["Frontend", "Backend", "Full-Stack", "UI/UX", "Zamonaviy"];

const RotatingWord = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const swap = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % DIRECTIONS.length);
        setVisible(true);
      }, 300);
    }, 2500);
    return () => clearInterval(swap);
  }, []);

  return (
    <span className={`hero__rotating ${visible ? "is-visible" : ""}`}>
      {DIRECTIONS[index]}
    </span>
  );
};

const Hero = () => {
  return (
    <section id="top" className="hero">
      {/* Orqa fondagi to'rsimon (network) animatsion fon */}
      <div className="hero__net-bg">
        <div className="net-line line-1"></div>
        <div className="net-line line-2"></div>
        <div className="net-point point-1"></div>
        <div className="net-point point-2"></div>
        <div className="net-point point-3"></div>
      </div>

      <div className="container hero__row">
        {/* Matn qismi */}
        <div className="hero__text">
          <div className="hero__eyebrow-badge">
            <span className="badge-dot" /> 80% Amaliyot / 20% Nazariya
          </div>
          
          <h1 className="hero__title">
            <RotatingWord /> dasturlashni real loyihalar orqali o'rganing
          </h1>
          
          <p className="hero__desc">
            Frontend (React, Next.js), Backend (Node.js) va boshqa yo'nalishlarda 
            tajribali mentorlar kuzatuvida noldan IT kompaniyalargacha bo'lgan yo'lni bosib o'ting.
          </p>
          
          <div className="hero__actions">
            <a href="#pricing" className="btn btn-primary">
              Kursni tanlash
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
            </a>
            <a href="#courses" className="btn btn-outline">Yo'nalishlarni ko'rish</a>
          </div>
        </div>

        {/* Vizual qism: Markaziy logotip va uzluksiz aylanuvchi orbita */}
        <div className="hero__visual">
          <div className="orbit-container">
            
            {/* Aylanuvchi orbitadagi elementlar (Orasida bo'sh joy qolmagan holda bir-biriga yaqin aylanishi uchun) */}
            <div className="orbit-ring">
              <div className="orbit-item item--1"><span>⚛️</span> React</div>
              <div className="orbit-item item--2"><span>🔷</span> TypeScript</div>
              <div className="orbit-item item--3"><span>🎨</span> Tailwind</div>
              <div className="orbit-item item--4"><span>📐</span> Matematika</div>
              <div className="orbit-item item--5"><span>🇬🇧</span> Ingliz tili</div>
              <div className="orbit-item item--6"><span>🟢</span> Node.js</div>
              <div className="orbit-item item--7"><span>🚀</span> Next.js</div>
            </div>

            {/* Markaziy doira (EDUSOFT Logotipi va yorug'lik effekti) */}
            <div className="orbit-center">
              <div className="orbit-center__glow"></div>
              <div className="orbit-center__content">
                <span className="orbit-center__text">EDUSOFT</span>
                <span className="orbit-center__sub">ACADEMY</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Statistika bloki */}
      <div className="hero__stats">
        <div className="container hero__stats-row">
          <div className="stat-card">
            <strong>4 yil</strong>
            <span>Amaliy tajriba</span>
          </div>
          <div className="stat-card">
            <strong>100+</strong>
            <span>Muvaffaqiyatli bitiruvchi</span>
          </div>
          <div className="stat-card">
            <strong>TenzorSoft</strong>
            <span>Bitiruvchilar ish joyi</span>
          </div>
          <div className="stat-card">
            <strong>1:1</strong>
            <span>Individual yondashuv</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;