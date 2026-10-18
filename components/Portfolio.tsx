"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { site, stats, services, method, experience, testimonials } from "@/data/site";
import { Reveal, SplitText, Counter, TiltCard, Magnetic } from "./ui";
import LevelTest from "./LevelTest";
import Logo from "./Logo";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

const NAV = [
  { href: "#about", label: "Haqqımda" },
  { href: "#services", label: "Dərslər" },
  { href: "#test", label: "Səviyyə testi" },
  { href: "#method", label: "Metod" },
  { href: "#experience", label: "Təcrübə" },
  { href: "#reviews", label: "Rəylər" },
  { href: "#contact", label: "Əlaqə" },
];

const MARQUEE = ["Speaking", "IELTS", "Grammar", "Vocabulary", "Pronunciation", "Writing", "Listening", "Confidence"];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <motion.header
      className={`nav ${scrolled ? "nav--scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <Logo />
      <nav className={`nav__links ${open ? "is-open" : ""}`}>
        {NAV.map((n) => (
          <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
            {n.label}
          </a>
        ))}
      </nav>
      <button className="burger" aria-label="Menyu" onClick={() => setOpen((o) => !o)}>
        <span />
        <span />
      </button>
    </motion.header>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 600], [0, 120]);
  const photoRotate = useTransform(scrollY, [0, 600], [0, -6]);
  return (
    <section id="top" className="hero">
      <div className="hero__text">
        <motion.div
          className="badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="dot" /> Yeni qruplara qeydiyyat açıqdır
        </motion.div>
        <h1>
          <SplitText text="Hello, I'm" className="hero__hello" delay={0.2} />
          <br />
          <SplitText text={site.name} className="gradient-text" delay={0.5} />
        </h1>
        <Reveal delay={0.9}>
          <p className="hero__role" lang="en">{site.role}</p>
          <p className="hero__tagline">{site.tagline}</p>
        </Reveal>
        <Reveal delay={1.1} className="hero__cta">
          <Magnetic href="#contact" className="btn btn--primary">
            Dərsə yazıl →
          </Magnetic>
          <Magnetic href="#test" className="btn btn--ghost">
            Pulsuz səviyyə testi
          </Magnetic>
        </Reveal>
      </div>

      <motion.div
        className="hero__photo-wrap"
        style={{ y: photoY, rotate: photoRotate }}
        initial={{ opacity: 0, scale: 0.85, rotate: 6 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero__ring" />
        <div className="hero__photo">
          <Image src={site.photo} alt={site.name} fill priority quality={95} sizes="(max-width: 900px) 80vw, 420px" />
        </div>
        <motion.div
          className="chip chip--1"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          🇬🇧 C2 Proficiency
        </motion.div>
        <motion.div
          className="chip chip--2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          ⭐ IELTS Expert
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        className="scroll-hint"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        scroll ↓
      </motion.a>
    </section>
  );
}

function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marquee">
      <div className="marquee__track">
        {items.map((w, i) => (
          <span key={i}>
            {w} <em>✦</em>
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="section">
      <div className="about glass">
        <Reveal>
          <p className="eyebrow" lang="en">About me</p>
          <h2>
            Dil — dünyaya açılan <span className="gradient-text">qapıdır</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="lead">{site.intro}</p>
        </Reveal>
        <div className="stats">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={0.1 * i} className="stat">
              <strong>
                <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
              </strong>
              <span>{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section">
      <Reveal>
        <p className="eyebrow" lang="en">Courses</p>
        <h2>Təklif etdiyim dərslər</h2>
      </Reveal>
      <div className="grid grid--4">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.1}>
            <TiltCard className="card glass">
              <div className="card__icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <div className="tags">
                {s.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Method() {
  return (
    <section id="method" className="section">
      <Reveal>
        <p className="eyebrow" lang="en">How I teach</p>
        <h2>Necə işləyirəm?</h2>
      </Reveal>
      <div className="steps">
        {method.map((m, i) => (
          <Reveal key={m.step} delay={i * 0.12} className="step glass">
            <span className="step__num">{m.step}</span>
            <h3>{m.title}</h3>
            <p>{m.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  const { scrollYProgress } = useScroll();
  const line = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  return (
    <section id="experience" className="section">
      <Reveal>
        <p className="eyebrow" lang="en">Experience</p>
        <h2>Təcrübə və təhsil</h2>
      </Reveal>
      <div className="timeline">
        <motion.div className="timeline__line" style={{ scaleY: line }} />
        {experience.map((e, i) => (
          <Reveal key={e.year} delay={i * 0.1} className="timeline__item">
            <span className="timeline__dot" />
            <div className="glass timeline__card">
              <span className="timeline__year">{e.year}</span>
              <h3>{e.title}</h3>
              <p>{e.place}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="section">
      <Reveal>
        <p className="eyebrow" lang="en">Testimonials</p>
        <h2>Tələbələr nə deyir?</h2>
      </Reveal>
      <div className="grid grid--3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.12}>
            <TiltCard className="card glass review">
              <div className="review__quote">“</div>
              <p>{t.text}</p>
              <div className="review__who">
                <span className="avatar">{t.name[0]}</span>
                <div>
                  <strong>{t.name}</strong>
                  <small>{t.result}</small>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section">
      <Reveal className="contact glass">
        <p className="eyebrow" lang="en">Let&apos;s talk</p>
        <h2>
          İngilis dilini birlikdə <span className="gradient-text">öyrənək!</span>
        </h2>
        <p className="lead">İlk sınaq dərsi pulsuzdur. Yazın, sizə uyğun vaxtı birlikdə seçək.</p>
        <div className="contact__btns">
          <Magnetic href={`https://wa.me/${site.whatsapp}`} className="btn btn--primary">
            WhatsApp-da yaz
          </Magnetic>
          <Magnetic href={`mailto:${site.email}`} className="btn btn--ghost">
            {site.email}
          </Magnetic>
        </div>
        <div className="contact__meta">
          <span>📍 {site.location}</span>
          <span>📞 {site.phone}</span>
          <a href={site.instagram} target="_blank" rel="noreferrer">
            Instagram ↗
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export default function Portfolio() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  const { scrollY } = useScroll();
  const sceneOpacity = useTransform(scrollY, [0, 700], [1, 0.3]);
  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} />
      <motion.div style={{ opacity: sceneOpacity }}>
        <Scene />
      </motion.div>
      <div className="bg-glow" />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <LevelTest />
        <Method />
        <Experience />
        <Reviews />
        <Contact />
      </main>
      <footer className="footer">
        © {new Date().getFullYear()} {site.name} · {site.role}
      </footer>
    </>
  );
}
