"use client";

import { useMemo, useState } from "react";
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

export default function TriviaPage() {
  const [pool] = useState<Question[]>(() => shuffle(QUESTIONS).slice(0, QUIZ_LENGTH));
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const question = pool[current];
  const rank = useMemo(() => rankFor(score), [score]);

  function choose(i: number) {
    if (selected !== null) return;
    setSelected(i);
    if (i === question.correct) setScore((s) => s + 1);
  }

  function next() {
    if (current + 1 >= pool.length) {
      setFinished(true);
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
  }

  if (pool.length === 0) return null;

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
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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

      <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-glow">{question.question}</h1>

      <div className="space-y-3">
        {question.options.map((opt, i) => {
          const isCorrect = i === question.correct;
          const isSelected = i === selected;
          let cls =
            "w-full text-left px-5 py-4 rounded-lg border transition-colors font-medium";
          if (selected === null) {
            cls += " border-kaiju-900/60 bg-white/[0.03] hover:border-kaiju-500/60";
          } else if (isCorrect) {
            cls += " border-kaiju-500 bg-kaiju-500/15 text-kaiju-300";
          } else if (isSelected) {
            cls += " border-red-500/60 bg-red-500/10 text-red-300";
          } else {
            cls += " border-kaiju-900/40 bg-white/[0.02] text-[#eafbee]/50";
          }
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
  );
}
