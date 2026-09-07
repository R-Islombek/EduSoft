import { useRef, useState } from "react";
import "./Testimonials.css";

const REVIEWS = [
  {
    id: "elbek",
    name: "Elbek",
    role: "Frontend dasturchi",
    company: "TenzorSoft",
    video: "/videos/elbek.mp4",
    poster: "/videos/posters/elbek.jpg",
  },
  {
    id: "abdurahmon",
    name: "Abdurahmon",
    role: "Frontend (React.js) dasturchi",
    company: "Imaan Tech",
    video: "/videos/abdurahmon.mp4",
    poster: "/videos/posters/abdurahmon.jpg",
  },
  {
    id: "sarvinoz",
    name: "Sarvinoz",
    role: "Frontend — stajirovkada",
    company: null,
    video: "/videos/sarvinoz.mp4",
    poster: "/videos/posters/sarvinoz.jpg",
  },
  {
    id: "muhamad",
    name: "Muxammadbek",
    role: "Frontend — junior",
    company: null,
    video: "/videos/muhammadbek.mp4",
    poster: "/videos/posters/muhammad.png",
  },
];

const VideoCard = ({ review, delay }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handleToggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <figure
      className="video-review"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="video-review__frame" onClick={handleToggle}>
        <video
          ref={videoRef}
          src={review.video}
          poster={review.poster}
          playsInline
          controls={false}
          loop={false}
          preload="metadata"
          onPause={() => setPlaying(false)}
          onEnded={() => setPlaying(false)}
        />
        {!playing && (
          <div className="video-review__play-overlay">
            <button className="video-review__play-btn" aria-label="Videoni o'ynatish">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        )}
      </div>
      
      <figcaption className="video-review__caption">
        <div className="video-review__user-data">
          <strong className="video-review__name">{review.name}</strong>
          <span className="video-review__meta">
            {review.role}
            {review.company && <span className="video-review__company"> · {review.company}</span>}
          </span>
        </div>
        <span className="video-review__type-tag">Video sharh</span>
      </figcaption>
    </figure>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <div className="testimonials__top text-center" data-aos="fade-up">
          <span className="eyebrow">Fikrlar</span>
          <h2 className="section-heading">O'quvchilar EduSoft haqida shunday deydi</h2>
          <p className="section-sub">
            Bitiruvchilarimiz o'z tajribasi, qiyinchiliklar va natijalari haqida so'zlab berishdi.
          </p>
        </div>

        <div className="testimonials__grid">
          {REVIEWS.map((r, i) => (
            <VideoCard review={r} delay={i * 150} key={r.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;