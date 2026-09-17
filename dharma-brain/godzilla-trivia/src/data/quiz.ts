export type Question = {
  question: string;
  options: string[];
  correct: number;
  kaiju: string;
};

export const QUESTIONS: Question[] = [
  {
    question: "What year did Godzilla first appear on screen?",
    options: ["1949", "1954", "1962", "1971"],
    correct: 1,
    kaiju: "godzilla",
  },
  {
    question: 'The name "Gojira" blends which two Japanese words?',
    options: [
      "Gorilla and whale",
      "Dragon and lizard",
      "Fire and thunder",
      "Ocean and mountain",
    ],
    correct: 0,
    kaiju: "godzilla",
  },
  {
    question: "How was Godzilla's iconic roar originally created?",
    options: [
      "A slowed-down lion recording",
      "A synthesizer",
      "A resin-coated glove rubbed along double bass strings, slowed down",
      "An elephant trumpet mixed with thunder",
    ],
    correct: 2,
    kaiju: "godzilla",
  },
  {
    question: "Godzilla was originally conceived as a metaphor for what?",
    options: [
      "Climate change",
      "Nuclear weapons and hydrogen bomb testing",
      "Industrial pollution",
      "World War II naval battles",
    ],
    correct: 1,
    kaiju: "godzilla",
  },
  {
    question: "What filming technique did the original 1954 film use to bring Godzilla to life?",
    options: [
      "Stop-motion animation",
      "Suitmation — an actor in a heavy rubber suit",
      "Hand-drawn animation composited into live footage",
      "Puppetry on wires",
    ],
    correct: 1,
    kaiju: "godzilla",
  },
  {
    question: "Roughly how many films has Godzilla starred in?",
    options: ["About 10", "About 20", "More than 30", "Exactly 50"],
    correct: 2,
    kaiju: "godzilla",
  },
  {
    question: "In 2004, Godzilla received which honor?",
    options: [
      "A UN ambassadorship",
      "A star on the Hollywood Walk of Fame",
      "A Grammy Award",
      "Japanese citizenship",
    ],
    correct: 1,
    kaiju: "godzilla",
  },
  {
    question: "Which Tokyo ward named Godzilla a Special Citizen and tourism ambassador in 2015?",
    options: ["Shibuya", "Shinjuku", "Akihabara", "Ginza"],
    correct: 1,
    kaiju: "godzilla",
  },
  {
    question: "Godzilla's dorsal fin design mixed features of a Stegosaurus, an Iguanodon, and which other dinosaur?",
    options: ["Triceratops", "Velociraptor", "Tyrannosaurus rex", "Brachiosaurus"],
    correct: 2,
    kaiju: "godzilla",
  },
  {
    question: 'What does "kaiju" (怪獣) literally translate to?',
    options: ["Ancient god", "Strange beast", "Fire lizard", "Ocean titan"],
    correct: 1,
    kaiju: "godzilla",
  },
  {
    question: "King Ghidorah first appeared on screen doing what?",
    options: [
      "Emerging from the ocean",
      "Arriving from space inside a meteorite",
      "Being created in a lab accident",
      "Awakening from beneath Mount Fuji",
    ],
    correct: 1,
    kaiju: "king-ghidorah",
  },
  {
    question: "How many heads and tails does King Ghidorah have?",
    options: ["Two heads, one tail", "Three heads, two tails", "One head, three tails", "Four heads, no tail"],
    correct: 1,
    kaiju: "king-ghidorah",
  },
  {
    question: "Mothra's tiny twin worshippers, the Shobijin, were played by which real-life duo?",
    options: ["The Peanuts", "Pink Lady", "Puffy AmiYumi", "Wink"],
    correct: 0,
    kaiju: "mothra",
  },
  {
    question: "What is unique about Mothra compared to most other kaiju?",
    options: [
      "She's the tallest kaiju in the franchise",
      "She has an on-screen life cycle from larva to full-grown moth",
      "She never appears in color films",
      "She only fights underwater",
    ],
    correct: 1,
    kaiju: "mothra",
  },
  {
    question: "Rodan's Japanese name, 'Radon,' is a shortened form of which word?",
    options: ["Radiation", "Pteranodon", "Dragon", "Typhoon"],
    correct: 1,
    kaiju: "rodan",
  },
  {
    question: "What is Rodan's signature ability?",
    options: [
      "Underwater breathing",
      "Regenerating lost limbs",
      "Supersonic flight that generates shockwaves",
      "Shooting a corona beam",
    ],
    correct: 2,
    kaiju: "rodan",
  },
  {
    question: "Mechagodzilla first appeared as a machine built by whom?",
    options: [
      "The Japanese military",
      "Alien invaders disguised as Godzilla",
      "A rogue scientist seeking revenge",
      "Seatopia's underground civilization",
    ],
    correct: 1,
    kaiju: "mechagodzilla",
  },
  {
    question: "The 2002 Mechagodzilla incarnation, Kiryu, is built around what?",
    options: [
      "Meteorite fragments",
      "A nuclear reactor core",
      "The bones of the original 1954 Godzilla",
      "Alien crystal technology",
    ],
    correct: 2,
    kaiju: "mechagodzilla",
  },
  {
    question: "Anguirus's design is explicitly based on which real dinosaur?",
    options: ["Stegosaurus", "Ankylosaurus", "Triceratops", "Pachycephalosaurus"],
    correct: 1,
    kaiju: "anguirus",
  },
  {
    question: "What happens between Godzilla and Anguirus in their very first on-screen fight?",
    options: [
      "They team up immediately",
      "Godzilla kills him with atomic breath",
      "Anguirus wins the fight",
      "They fight to a draw and become rivals",
    ],
    correct: 1,
    kaiju: "anguirus",
  },
  {
    question: "Gigan's signature weapons include a buzzsaw abdomen and what else?",
    options: [
      "A tail-mounted cannon",
      "Hook-blades in place of hands",
      "A gravity beam from his forehead",
      "Poisonous spines",
    ],
    correct: 1,
    kaiju: "gigan",
  },
  {
    question: "What notable 'first' does Gigan achieve in the franchise?",
    options: [
      "First kaiju to fly",
      "First kaiju built by humans",
      "First kaiju to actually draw blood from Godzilla",
      "First kaiju to appear in color",
    ],
    correct: 2,
    kaiju: "gigan",
  },
  {
    question: "Destoroyah's origin is directly tied to which earlier weapon in Godzilla history?",
    options: [
      "The Mechagodzilla program",
      "The Oxygen Destroyer that killed the original Godzilla",
      "A failed nuclear missile test",
      "The Dimension Tide satellite weapon",
    ],
    correct: 1,
    kaiju: "destoroyah",
  },
  {
    question: "Destoroyah doesn't start out as one giant creature. How does he begin?",
    options: [
      "As a single microscopic cell",
      "As a swarm of small crab-like creatures that merge and mutate",
      "As a dormant egg buried under Tokyo",
      "As a robotic prototype",
    ],
    correct: 1,
    kaiju: "destoroyah",
  },
  {
    question: "Biollante was created by splicing Godzilla cells with what?",
    options: [
      "Shark and jellyfish DNA",
      "Rose plant cells and human DNA",
      "Coral reef organisms",
      "Bamboo and insect DNA",
    ],
    correct: 1,
    kaiju: "biollante",
  },
  {
    question: "How did Biollante's story originate?",
    options: [
      "A Toho screenwriter's personal idea",
      "An adaptation of a classic novel",
      "The winning entry in a nationwide fan contest",
      "A leftover concept from a cancelled sequel",
    ],
    correct: 2,
    kaiju: "biollante",
  },
  {
    question: "SpaceGodzilla's signature attack, the Corona Beam, does what that Godzilla's atomic breath can't?",
    options: [
      "Fires underwater only",
      "Curves in mid-flight",
      "Heals the target",
      "Works only at night",
    ],
    correct: 1,
    kaiju: "spacegodzilla",
  },
  {
    question: "What gives SpaceGodzilla control over gravity?",
    options: [
      "His tail spikes",
      "Twin crystals growing from his shoulders",
      "A device embedded in his skull",
      "Radiation absorbed from Godzilla",
    ],
    correct: 1,
    kaiju: "spacegodzilla",
  },
  {
    question: "Hedorah's name comes from a Japanese word meaning what?",
    options: ["Shadow", "Sludge or chemical ooze", "Storm", "Ash"],
    correct: 1,
    kaiju: "hedorah",
  },
  {
    question: "Godzilla vs. Hedorah is notable for tackling which real-world issue?",
    options: [
      "Nuclear proliferation",
      "Industrial pollution",
      "Urban overpopulation",
      "Deep-sea mining",
    ],
    correct: 1,
    kaiju: "hedorah",
  },
  {
    question: "Megalon is worshipped as a god by which fictional underground civilization?",
    options: ["Atlantis", "Seatopia", "Mu", "Infant Island"],
    correct: 1,
    kaiju: "megalon",
  },
  {
    question: "What robot originally guides Megalon into Tokyo before switching sides?",
    options: ["Mechagodzilla", "Jet Jaguar", "Moguera", "Kiryu"],
    correct: 1,
    kaiju: "megalon",
  },
  {
    question: "King Kong first appeared on film in what year — decades before Godzilla existed?",
    options: ["1925", "1933", "1941", "1954"],
    correct: 1,
    kaiju: "king-kong",
  },
  {
    question: "Who actually owns the King Kong character?",
    options: ["Toho Co., Ltd.", "Warner Bros./Legendary", "Universal Pictures", "It's public domain"],
    correct: 1,
    kaiju: "king-kong",
  },
  {
    question: "MUTOs first appeared as the antagonists in which film?",
    options: [
      "Godzilla vs. Kong (2021)",
      "Legendary's Godzilla (2014)",
      "Kong: Skull Island (2017)",
      "Godzilla: King of the Monsters (2019)",
    ],
    correct: 1,
    kaiju: "mutos",
  },
  {
    question: "What do MUTOs feed on to sustain themselves?",
    options: ["Plant matter", "Other kaiju", "Radioactive material", "Deep ocean minerals"],
    correct: 2,
    kaiju: "mutos",
  },
];
