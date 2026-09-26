import Link from "next/link";

const ATOMIC_FACTS = [
  "Godzilla first appeared in the 1954 Japanese film Gojira, directed by Ishiro Honda.",
  'The name "Gojira" blends the Japanese words "gorira" (gorilla) and "kujira" (whale).',
  "Godzilla's roar was created by rubbing a resin-coated glove along double bass strings, then slowing the recording down.",
  "Godzilla was conceived as a metaphor for nuclear weapons, born from the trauma of Hiroshima, Nagasaki, and hydrogen bomb testing at Bikini Atoll.",
  "The original 1954 Godzilla suit weighed around 220 pounds and was brutally hot and difficult to move in.",
  "Godzilla's atomic breath is a radioactive beam he can fire even while swimming underwater.",
  "Godzilla has grown over the decades, from 50 meters tall in 1954 to about 393 feet (119.8 meters) in 2019's Godzilla: King of the Monsters.",
  "Godzilla has starred in more than 30 films, one of the longest-running film franchises in history.",
  "Godzilla received a star on the Hollywood Walk of Fame in 2004 for the character's 50th anniversary.",
  "In 2015, Tokyo's Shinjuku ward named Godzilla a Special Citizen and tourism ambassador.",
  "Godzilla's design mixed features of a Tyrannosaurus rex, an Iguanodon, and a Stegosaurus for the dorsal fins.",
  "The original film used suitmation, an actor in a heavy rubber suit, rather than stop-motion animation.",
  "Godzilla has shown strong regenerative ability, healing from severe wounds and even regrowing lost limbs in some continuities.",
  "Godzilla's dorsal fins glow blue right before he unleashes his atomic breath.",
  '"Kaiju" (怪獣) literally translates to "strange beast," the general Japanese term for giant monsters like Godzilla.',
];

export default function Home() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <p className="uppercase tracking-[0.3em] text-kaiju-400 text-sm font-semibold mb-4">
          Kaiju Archive
        </p>
        <h1 className="text-6xl sm:text-8xl font-black uppercase tracking-tight text-glow mb-4">
          Godzilla
        </h1>
        <p className="text-lg text-[#eafbee]/70 mb-6">King of the Monsters · Since 1954</p>
        <p className="max-w-2xl mx-auto text-[#eafbee]/70 mb-10">
          Facts, foes, and a trivia challenge for anyone who has ever cheered while Tokyo burned.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/trivia"
            className="bg-kaiju-500 hover:bg-kaiju-600 text-[#06120a] font-bold uppercase tracking-wide px-8 py-3 rounded-md transition-colors"
          >
            Take the Quiz
          </Link>
          <Link
            href="/kaiju"
            className="border border-kaiju-500 hover:bg-kaiju-500/10 text-kaiju-400 font-bold uppercase tracking-wide px-8 py-3 rounded-md transition-colors"
          >
            Meet the Kaiju
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <h2 className="text-3xl font-black uppercase tracking-wide text-center mb-10 text-glow">
          Atomic Facts
        </h2>
        <ol className="space-y-4">
          {ATOMIC_FACTS.map((fact, i) => (
            <li
              key={i}
              className="flex gap-4 bg-white/[0.03] border border-kaiju-900/60 rounded-lg p-4"
            >
              <span className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-kaiju-500/20 text-kaiju-400 font-bold text-sm">
                {i + 1}
              </span>
              <p className="text-[#eafbee]/85">{fact}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
