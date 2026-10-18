"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { questions, results, levelFromScore, type Level } from "@/data/quiz";
import { site } from "@/data/site";
import { Reveal, Counter } from "./ui";

type Stage = "intro" | "quiz" | "result";
const LEVELS: Level[] = ["A1", "A2", "B1", "B2", "C1"];
const ease = [0.22, 1, 0.36, 1] as const;

export default function LevelTest() {
  const [stage, setStage] = useState<Stage>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [picked, setPicked] = useState<number | null>(null);

  const current = questions[index];
  const score = answers.filter((a, i) => a === questions[i].answer).length;
  const level = levelFromScore(score);

  function start() {
    setAnswers([]);
    setIndex(0);
    setPicked(null);
    setStage("quiz");
  }

  function choose(option: number | null) {
    if (picked !== null) return;
    setPicked(option ?? -1);
    // qısa fasilə — seçimin vurğulanması görünsün
    setTimeout(() => {
      const next = [...answers, option];
      setAnswers(next);
      setPicked(null);
      if (index + 1 < questions.length) setIndex(index + 1);
      else setStage("result");
    }, 450);
  }

  const waText = encodeURIComponent(
    `Salam! Saytdakı səviyyə testində ${level} (${results[level].title}) nəticəsi aldım — ${score}/${questions.length}. Dərslər haqqında məlumat almaq istəyirəm.`
  );

  return (
    <section id="test" className="section">
      <Reveal>
        <p className="eyebrow" lang="en">Free level test</p>
        <h2>
          İngilis dili səviyyənizi <span className="gradient-text">yoxlayın</span>
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="quiz glass">
          <AnimatePresence mode="wait">
            {stage === "intro" && (
              <motion.div
                key="intro"
                className="quiz__intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease }}
              >
                <div className="quiz__levels">
                  {LEVELS.map((l, i) => (
                    <motion.span
                      key={l}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * i, ease }}
                    >
                      {l}
                    </motion.span>
                  ))}
                </div>
                <p className="lead">
                  {questions.length} sual · təxminən 5 dəqiqə · pulsuz. Sonda CEFR səviyyənizi (A1–C1) və sizə uyğun kursu
                  öyrənəcəksiniz.
                </p>
                <p className="quiz__hint">Cavabı bilmirsinizsə, təxmin etməyin — “Bilmirəm” seçin, nəticə daha dəqiq olar.</p>
                <button className="btn btn--primary" onClick={start}>
                  Testə başla →
                </button>
              </motion.div>
            )}

            {stage === "quiz" && (
              <motion.div
                key={`q-${index}`}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4, ease }}
              >
                <div className="quiz__top">
                  <span>
                    Sual {index + 1} / {questions.length}
                  </span>
                  <span className="quiz__tag">{current.level}</span>
                </div>
                <div className="quiz__bar">
                  <motion.div
                    className="quiz__bar-fill"
                    initial={{ width: `${(index / questions.length) * 100}%` }}
                    animate={{ width: `${((index + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5, ease }}
                  />
                </div>
                <h3 className="quiz__q">{current.q}</h3>
                <div className="quiz__options">
                  {current.options.map((o, i) => (
                    <motion.button
                      key={o}
                      className={`quiz__opt ${picked === i ? "is-picked" : ""}`}
                      onClick={() => choose(i)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <span className="quiz__letter">{"ABCD"[i]}</span>
                      {o}
                    </motion.button>
                  ))}
                </div>
                <button className="quiz__skip" onClick={() => choose(null)}>
                  Bilmirəm →
                </button>
              </motion.div>
            )}

            {stage === "result" && (
              <motion.div
                key="result"
                className="quiz__result"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease }}
              >
                <p className="quiz__hint">Sizin səviyyəniz</p>
                <motion.div
                  className="quiz__level"
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 180, damping: 12, delay: 0.2 }}
                >
                  {level}
                </motion.div>
                <h3>{results[level].title}</h3>
                <p className="quiz__score">
                  <Counter value={score} /> / {questions.length} düzgün cavab
                </p>

                <div className="quiz__scale">
                  {LEVELS.map((l) => (
                    <span key={l} className={l === level ? "is-active" : LEVELS.indexOf(l) < LEVELS.indexOf(level) ? "is-done" : ""}>
                      {l}
                    </span>
                  ))}
                </div>

                <p className="lead">{results[level].text}</p>
                <p className="quiz__course">
                  Tövsiyə olunan kurs: <strong>{results[level].course}</strong>
                </p>

                <div className="contact__btns">
                  <a href={`https://wa.me/${site.whatsapp}?text=${waText}`} target="_blank" rel="noreferrer" className="btn btn--primary">
                    Nəticəni göndər və dərsə yazıl
                  </a>
                  <button className="btn btn--ghost" onClick={start}>
                    Yenidən başla
                  </button>
                </div>
                <p className="quiz__hint">Bu qısa testdir — dəqiq səviyyə ilk pulsuz dərsdə müəyyən olunur.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}
