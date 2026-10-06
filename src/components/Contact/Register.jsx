import { useEffect, useRef, useState } from "react";
import "./Register.css";

const COURSES = [
  "Frontend (React, Next.js)",
  "Backend (Node.js)",
  "Full-Stack Dasturlash",
  "Dasturlash asoslari",
  "UI/UX Dizayn",
];

/* "+998 90 123 45 67" ko'rinishiga keltiradi */
const formatPhone = (raw) => {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("998")) d = d.slice(3);
  d = d.slice(0, 9);
  if (!d) return "";
  const parts = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean);
  return `+998 ${parts.join(" ")}`;
};

const validate = (v) => {
  const errors = {};
  if (v.name.trim().length < 2) errors.name = "Ismingizni kiriting";
  if (v.phone.replace(/\D/g, "").length !== 12) errors.phone = "Raqamni to'liq kiriting: +998 90 123 45 67";
  if (!v.course) errors.course = "Kursni tanlang";
  return errors;
};

/* Arizani shu funksiya orqali backend'ga yuboring.
   Telegram bot tokenini frontendga yozmang — o'z serveringiz orqali yuboring. */
const registerRequest = async (payload) => {
  // TODO: await fetch("/api/register", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  await new Promise((resolve) => setTimeout(resolve, 900));
  return payload;
};

/* Yuqori qismdagi geometrik fon */
const Art = () => (
  <div className="reg__art" aria-hidden="true">
    <svg viewBox="0 0 1200 420" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="rg-indigo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4338ca" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="rg-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#38bdf8" />
          <stop offset="1" stopColor="#bae6fd" />
        </linearGradient>
        <linearGradient id="rg-pink" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="rg-deep" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#312e81" />
          <stop offset="1" stopColor="#4f46e5" />
        </linearGradient>
      </defs>

      <rect x="330" y="0" width="190" height="420" fill="url(#rg-sky)" />
      <rect x="520" y="0" width="190" height="420" fill="url(#rg-indigo)" />
      <rect x="710" y="0" width="170" height="420" fill="#c7d2fe" />

      <circle cx="620" cy="40" r="170" fill="url(#rg-pink)" />
      <polygon points="520,0 710,0 615,150" fill="#a5b4fc" opacity="0.55" />

      <circle cx="40" cy="40" r="290" fill="url(#rg-deep)" />
      <circle cx="40" cy="40" r="210" fill="none" stroke="#a5b4fc" strokeOpacity="0.35" strokeWidth="2" />

      <circle cx="900" cy="130" r="110" fill="#fff" opacity="0.75" />
      <polygon points="960,150 1200,150 960,0" fill="#22d3ee" opacity="0.9" />
      <polygon points="880,420 1060,420 880,250" fill="url(#rg-indigo)" opacity="0.5" />
    </svg>
  </div>
);

const Register = ({ onSuccess }) => {
  const doneRef = useRef(null);
  const [values, setValues] = useState({ name: "", phone: "", course: "", website: "" });
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [serverError, setServerError] = useState("");

  const errors = validate(values);
  const showError = (f) => touched[f] && errors[f];

  useEffect(() => {
    if (status === "sent") doneRef.current?.focus();
  }, [status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: name === "phone" ? formatPhone(value) : value }));
  };
  const handleBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, course: true });
    setServerError("");
    if (Object.keys(errors).length) return;
    if (values.website) return; // bot tuzog'i

    setStatus("sending");
    try {
      const { website, ...payload } = values;
      const result = await registerRequest(payload);
      onSuccess?.(result);
      setStatus("sent");
    } catch {
      setStatus("idle");
      setServerError("Yuborib bo'lmadi. Iltimos, Telegram orqali yozing: @edusoft_admin");
    }
  };

  const reset = () => {
    setValues({ name: "", phone: "", course: "", website: "" });
    setTouched({});
    setStatus("idle");
  };

  return (
    <main className="reg">
      <Art />

      <a className="reg__back" href="/">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M19 12H5m7-7l-7 7 7 7" />
        </svg>
        EduSoft
      </a>

      <section className="reg__card" aria-labelledby="reg-title">
        <div className="reg__badge" aria-hidden="true">
          <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke="#fff" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="20" cy="17" r="7" />
            <path d="M6 38c0-7.2 6.3-11 14-11 3 0 5.6.6 7.8 1.7" />
            <path d="M37 25v12M31 31h12" />
          </svg>
        </div>

        {status === "sent" ? (
          <div className="reg-done" role="status">
            <svg className="reg-done__check" width="76" height="76" viewBox="0 0 84 84" fill="none" aria-hidden="true">
              <circle className="reg-done__ring" cx="42" cy="42" r="38" />
              <path className="reg-done__tick" d="M26 43l11 11 21-23" />
            </svg>
            <h1 id="reg-title" ref={doneRef} tabIndex={-1}>
              Rahmat, {values.name.trim().split(" ")[0]}!
            </h1>
            <p>
              So'rovingiz qabul qilindi. <b>{values.course}</b> bo'yicha mutaxassisimiz 24 soat ichida siz bilan
              bog'lanadi.
            </p>
            <div className="reg-done__actions">
              <a className="reg__submit reg-done__home" href="/">
                Bosh sahifaga
              </a>
              <button type="button" className="reg-done__again" onClick={reset}>
                Yana ariza yuborish
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 id="reg-title">Ro'yxatdan o'tish</h1>
            <p className="reg__lead">Ma'lumotlaringizni qoldiring — 24 soat ichida bog'lanamiz.</p>

            <form className="reg__form" onSubmit={handleSubmit} noValidate>
              <div className="rf">
                <label htmlFor="name">Ism *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Masalan: Anvar"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!showError("name")}
                  aria-describedby={showError("name") ? "name-err" : undefined}
                />
                {showError("name") && (
                  <p className="rf__error" id="name-err">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="rf">
                <label htmlFor="phone">Telefon raqam *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+998 90 123 45 67"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!showError("phone")}
                  aria-describedby={showError("phone") ? "phone-err" : undefined}
                />
                {showError("phone") && (
                  <p className="rf__error" id="phone-err">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="rf">
                <label htmlFor="course">Qaysi kurs *</label>
                <div className="rf__select">
                  <select
                    id="course"
                    name="course"
                    value={values.course}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={values.course ? "" : "is-empty"}
                    aria-invalid={!!showError("course")}
                    aria-describedby={showError("course") ? "course-err" : undefined}
                  >
                    <option value="" disabled>
                      Kursni tanlang
                    </option>
                    {COURSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <svg className="rf__chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
                {showError("course") && (
                  <p className="rf__error" id="course-err">
                    {errors.course}
                  </p>
                )}
              </div>

              {/* Botlar uchun tuzoq: odamga ko'rinmaydi */}
              <input className="reg__hp" type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={handleChange} aria-hidden="true" />

              {serverError && (
                <p className="reg__alert" role="alert">
                  {serverError}
                </p>
              )}

              <button type="submit" className="reg__submit" disabled={status === "sending"}>
                {status === "sending" ? (
                  <>
                    <span className="reg__spinner" aria-hidden="true" />
                    Yuborilmoqda...
                  </>
                ) : (
                  "Ro'yxatdan o'tish"
                )}
              </button>
            </form>

            <p className="reg__foot">
              Akkauntingiz bormi? <a href="/login">Kirish</a>
            </p>
          </>
        )}
      </section>
    </main>
  );
};

export default Register;