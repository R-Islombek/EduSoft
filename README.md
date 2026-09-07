# EduSoft Akademiyasi — Landing Page

React + Vite asosida qurilgan landing sahifa.

## Ishga tushirish

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Natija `dist/` papkasida hosil bo'ladi — uni Vercel, Netlify yoki istalgan
static hosting'ga yuklashingiz mumkin.

## Tuzilma

```
src/
  components/
    Header/       — sticky navigatsiya
    Hero/         — asosiy banner (kod-oyna vizuali bilan)
    Courses/      — 4 ta kurs kartasi
    Mentors/      — mentor (Islombek) haqida blok
    Pricing/      — 3 ta narx rejasi
    Testimonials/ — o'quvchilar fikri (placeholder matn)
    Contact/      — aloqa formasi
    Footer/       — pastki qism
  index.css       — dizayn tokenlari (rang, shrift, radius)
```

## O'zgartirish kerak bo'lgan joylar (real ma'lumotlar bilan)

- `src/components/Pricing/Pricing.jsx` — narxlarni real summalarga almashtiring
- `src/components/Testimonials/Testimonials.jsx` — placeholder fikrlarni haqiqiy o'quvchilar fikri bilan almashtiring
- `src/components/Contact/Contact.jsx` — telefon raqam, Telegram va manzilni yangilang, shuningdek formani real backend'ga (masalan Telegram bot API) ulang
- `src/components/Header/Header.jsx` va `Footer.jsx` — kerak bo'lsa logotipni rasm bilan almashtiring
