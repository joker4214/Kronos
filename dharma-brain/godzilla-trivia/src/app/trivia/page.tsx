"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { QUESTIONS, type Question } from "@/data/quiz";

const QUIZ_LENGTH = 10;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function rankFor(score: number): { title: string; blurb: string } {
  if (score <= 2)
    return {
      title: "Crushed in Tokyo",
      blurb: "The monster won this round. Read a few more atomic facts and try again.",
    };
  if (score <= 4)
    return {
      title: "Extra in the Crowd Scene",
      blurb: "You know the big beats, but the kaiju directory has more waiting for you.",
    };
  if (score <= 6)
    return {
      title: "Kaiju Enthusiast",
      blurb: "Solid instincts. You've clearly spent time in the archive.",
    };
  if (score <= 8)
    return {
      title: "Monster Historian",
      blurb: "Deep cuts, obscure suits, decades of trivia — you've got it.",
    };
  return {
    title: "King of the Monsters",
    blurb: "Flawless or nearly flawless. Tokyo never stood a chance.",
  };
}

// Godzilla-only questions get the close-up head shot; every other kaiju
// reuses its existing "Meet the Kaiju" portrait as the question backdrop.
function backgroundFor(kaiju: string) {
  if (kaiju === "godzilla") return "/kaiju/godzilla-closeup.jpg";
  return `/kaiju/${kaiju}.jpg`;
}

const BREATH_EXIT_MS = 350;

export default function TriviaPage() {
  // Shuffling uses Math.random(), which must never run during server render --
  // the server and client would pick different orders and React would throw a
  // hydration mismatch (error #418), which can force a full remount mid-quiz
  // and silently reset progress back to a fresh Question 1. Generating the
  // pool in an effect (client-only, post-mount) instead of a useState
  // initializer (which also runs during SSR) avoids that entirely.
  const [pool, setPool] = useState<Question[] | null>(null);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [breathLeaving, setBreathLeaving] = useState(false);

  useEffect(() => {
    setPool(shuffle(QUESTIONS).slice(0, QUIZ_LENGTH));
  }, []);

  const rank = useMemo(() => rankFor(score), [score]);

  if (pool === null) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center text-[#eafbee]/50">
        Loading quiz…
      </div>
    );
  }

  const question = pool[current];
  const showBreath = selected !== null;

  function choose(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === question.correct) setScore((s) => s + 1);
  }

  function next() {
    setBreathLeaving(true);
    window.setTimeout(() => {
      setBreathLeaving(false);
      if (current + 1 >= pool!.length) {
        setFinished(true);
      } else {
        setCurrent((c) => c + 1);
        setSelected(null);
      }
    }, BREATH_EXIT_MS);
  }

  if (finished) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <p className="uppercase tracking-[0.3em] text-kaiju-400 text-sm font-semibold mb-4">
          Results
        </p>
        <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-glow mb-3">
          {rank.title}
        </h1>
        <p className="text-lg text-[#eafbee]/70 mb-2">
          {score} / {pool.length} correct
        </p>
        <p className="text-[#eafbee]/60 max-w-md mx-auto mb-10">{rank.blurb}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => window.location.reload()}
            className="bg-kaiju-500 hover:bg-kaiju-600 text-[#06120a] font-bold uppercase tracking-wide px-8 py-3 rounded-md transition-colors"
          >
            Play Again
          </button>
          <Link
            href="/kaiju"
            className="border border-kaiju-500 hover:bg-kaiju-500/10 text-kaiju-400 font-bold uppercase tracking-wide px-8 py-3 rounded-md transition-colors"
          >
            Meet the Kaiju
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Full-viewport kaiju backdrop, one per question, matched to whichever
          monster the question is about. Keyed on `current` so each question
          mounts a fresh element and fades in rather than hard-cutting. */}
      <div
        key={current}
        className="fixed inset-0 -z-10 bg-cover bg-center animate-bg-fadein"
        style={{ backgroundImage: `url(${backgroundFor(question.kaiju)})` }}
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/75 via-black/65 to-black/90" />

      {/* Answer-reveal flourish: Godzilla lunges in from the left breathing
          atomic fire the instant an answer is chosen, whether it was right
          or wrong -- the beam always points at the actually-correct option,
          so a wrong guess still shows you the right one. */}
      {showBreath && (
        <>
          <div
            className={`fixed inset-0 z-30 pointer-events-none bg-radial-gradient ${
              breathLeaving ? "" : "animate-impact-flash"
            }`}
            style={{
              background:
                "radial-gradient(circle at 15% 50%, rgba(120,210,255,0.55), transparent 55%)",
            }}
          />
          <img
            src="/effects/godzilla-firebreath.jpg"
            alt=""
            className={`fixed left-0 bottom-0 z-30 pointer-events-none w-[46vw] max-w-[420px] min-w-[220px] drop-shadow-[0_0_40px_rgba(56,189,248,0.5)] ${
              breathLeaving ? "animate-breath-out" : "animate-breath-in"
            }`}
          />
        </>
      )}

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8 text-sm text-[#eafbee]/60">
          <span>
            Question {current + 1} / {pool.length}
          </span>
          <span>Score: {score}</span>
        </div>

        <div className="w-full h-1.5 bg-white/10 rounded-full mb-10 overflow-hidden">
          <div
            className="h-full bg-kaiju-500 transition-all duration-300"
            style={{ width: `${(current / pool.length) * 100}%` }}
          />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-glow bg-black/40 rounded-lg px-4 py-3 backdrop-blur-sm">
          {question.question}
        </h1>

        <div className="space-y-3">
          {question.options.map((opt, i) => {
            const isCorrect = i === question.correct;
            const isSelected = i === selected;
            const isWrongPick = selected !== null && isSelected && !isCorrect;
            let cls =
              "w-full text-left px-5 py-4 rounded-lg border transition-colors font-medium backdrop-blur-sm";
            if (selected === null) {
              cls += " border-kaiju-900/60 bg-black/40 hover:border-kaiju-500/60";
            } else if (isCorrect) {
              cls += " border-sky-400 bg-sky-400/15 text-sky-200 animate-correct-pulse";
            } else if (isSelected) {
              cls += " border-red-500/60 bg-red-500/10 text-red-300";
            } else {
              cls += " border-kaiju-900/40 bg-black/30 text-[#eafbee]/50";
            }
            if (isWrongPick) cls += " animate-wrong-shake";
            return (
              <button key={i} onClick={() => choose(i)} className={cls} disabled={selected !== null}>
                {opt}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <button
            onClick={next}
            className="mt-10 w-full bg-kaiju-500 hover:bg-kaiju-600 text-[#06120a] font-bold uppercase tracking-wide px-8 py-3 rounded-md transition-colors"
          >
            {current + 1 >= pool.length ? "See Results" : "Next Question"}
          </button>
        )}
      </div>
    </div>
  );
}
