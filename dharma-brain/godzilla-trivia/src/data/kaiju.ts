export type Kaiju = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  rightsNote?: string;
  bio: string;
  facts: string[];
};

export const KAIJU: Kaiju[] = [
  {
    slug: "godzilla",
    name: "Godzilla",
    tagline: "King of the Monsters · Since 1954",
    image: "/kaiju/godzilla.jpg",
    bio: "Godzilla first appeared in 1954's Gojira, directed by Ishiro Honda, as a metaphor for the trauma of Hiroshima, Nagasaki, and hydrogen bomb testing at Bikini Atoll. More than 30 films later, he remains the franchise's namesake and its most enduring force of nature.",
    facts: [
      "Godzilla first appeared in the 1954 Japanese film Gojira, directed by Ishiro Honda.",
      'The name "Gojira" blends the Japanese words "gorira" (gorilla) and "kujira" (whale).',
      "Godzilla's roar was created by rubbing a resin-coated glove along double bass strings, then slowing the recording down.",
      "The original 1954 Godzilla suit weighed around 220 pounds and was brutally hot and difficult to move in.",
      "Godzilla's atomic breath is a radioactive beam he can fire even while swimming underwater.",
      "Godzilla has grown over the decades, from 50 meters tall in 1954 to about 393 feet (119.8 meters) in 2019's Godzilla: King of the Monsters.",
      "Godzilla received a star on the Hollywood Walk of Fame in 2004 for the character's 50th anniversary.",
      "In 2015, Tokyo's Shinjuku ward named Godzilla a Special Citizen and tourism ambassador.",
    ],
  },
  {
    slug: "king-ghidorah",
    name: "King Ghidorah",
    tagline: "Golden Terror from the Stars · Since 1964",
    image: "/kaiju/king-ghidorah.jpg",
    bio: "King Ghidorah first tore across the screen in 1964's Ghidorah, the Three-Headed Monster, arriving on Earth inside a meteorite with a plan to wipe out the planet like he'd already done to Venus. He's the closest thing the franchise has to a recurring arch-villain — usually an extraterrestrial threat so dangerous that Godzilla, Rodan, and Mothra have to team up just to drive him off.",
    facts: [
      'Effects legend Eiji Tsuburaya gave the design team almost no direction beyond "three heads, two tails, and a voice like a bell" — the rest was up to them.',
      "His three-headed look borrows from the Greek Hydra and Japan's own Yamata no Orochi myth; Tsuburaya actually scrapped an eight-headed version for being too much.",
      "Showa-era King Ghidorah clocks in at 100 meters tall with a 150-meter wingspan — bigger across the wings than Godzilla is tall.",
      "His 1964 debut is the first film where Godzilla, Rodan, and Mothra fight on the same side, setting the template for every 'good monsters team up' movie since.",
      'English dubs just called him "Ghidrah" for his first three films — "King Ghidorah" didn\'t stick in American releases until 1972\'s Godzilla vs. Gigan.',
    ],
  },
  {
    slug: "mothra",
    name: "Mothra",
    tagline: "Guardian Goddess of Infant Island · Since 1961",
    image: "/kaiju/mothra.jpg",
    bio: "Mothra debuted in her own solo film in 1961, adapted from a serialized novel called The Luminous Fairies and Mothra. She's a giant divine moth worshipped by the natives of Infant Island, and unlike most kaiju she's usually on humanity's side — a protector deity who gets pulled into fights with Godzilla and other monsters more often than she starts them.",
    facts: [
      "She's the only major kaiju with an on-screen life cycle — you watch her move from larva to cocoon to full-grown moth across her films.",
      "Her worshippers, the tiny twin Shobijin, were played by real-life singing duo The Peanuts (Emi and Yumi Ito), who communicate with Mothra telepathically.",
      "Her larva form spins actual silk on-screen — a callback to her origins in a story about a giant-moth-worship island.",
      "She fought alongside Godzilla and Rodan against King Ghidorah in 1964, cementing her as one of the franchise's original 'good monster' alliance.",
      "Her signature attacks are wing-scale powder clouds and hurricane-force wingbeats rather than any kind of beam or fire.",
    ],
  },
  {
    slug: "rodan",
    name: "Rodan",
    tagline: "The Fire Demon of Mount Aso · Since 1956",
    image: "/kaiju/rodan.jpg",
    bio: "Rodan got his own film in 1956, released in Japan as Radon — a shortened form of 'pteranodon.' He's a giant prehistoric flying reptile who emerged from the depths of Mount Aso, and he officially joined the Godzilla series in 1964's Ghidorah, the Three-Headed Monster, where he settled into his long-term role as one of Godzilla's most reliable allies.",
    facts: [
      "His original Japanese name 'Radon' got changed to 'Rodan' for international release, mostly to avoid confusion with the chemical element radon.",
      "Rodan (1956) was Toho's first tokusatsu kaiju monster movie shot in color.",
      "His signature move is supersonic flight — moving fast enough to generate shockwaves and sonic booms that level buildings without him even landing.",
      "He's been one of the most consistently recurring kaiju in the franchise, showing up as backup muscle in team-up films across the Showa, Heisei, and Millennium eras.",
      "In his debut, he emerged alongside a swarm of giant prehistoric insect larvae (Meganulon) rather than showing up alone.",
    ],
  },
  {
    slug: "mechagodzilla",
    name: "Mechagodzilla",
    tagline: "Godzilla's Mechanical Doppelganger · Since 1974",
    image: "/kaiju/mechagodzilla.jpg",
    bio: "Mechagodzilla first rolled out in 1974's Godzilla vs. Mechagodzilla — a robotic duplicate built by alien invaders and disguised in synthetic 'Godzilla skin' to infiltrate and destroy Japan's trust in the real thing before the disguise gets torn off mid-battle. The character's origin story gets rewritten with nearly every era of the franchise, but the core idea — a mechanical Godzilla built to beat the real one — never changes.",
    facts: [
      "In his debut, he's built by alien invaders (later identified as the Simeons/Black Hole Planet 3 aliens) rather than by humans.",
      "The 1976 U.S. theatrical release renamed the film Godzilla vs. the Bionic Monster, riding on the popularity of The Six Million Dollar Man.",
      "Later Heisei-era versions flip the script entirely — Mechagodzilla becomes a human-built anti-Godzilla weapon, sometimes combining with a support jet called Garuda into 'Super Mechagodzilla.'",
      "The 2002 version, Kiryu, has one of the franchise's darkest twists: it's built around the actual bones of the original Godzilla killed in 1954.",
      "His arsenal has included finger-mounted missiles, a chest-mounted energy beam, and — depending on the era — literally anything else the writers could bolt onto a robot Godzilla.",
    ],
  },
  {
    slug: "anguirus",
    name: "Anguirus",
    tagline: "Godzilla's First Rival, First Friend · Since 1955",
    image: "/kaiju/anguirus.jpg",
    bio: "Anguirus showed up just one year after Godzilla, in 1955's Godzilla Raids Again — making him Godzilla's very first on-screen opponent. He's a quadrupedal, armor-plated kaiju awakened by nuclear testing just like Godzilla was, and their brawl through Osaka became the template for every kaiju-on-kaiju fight that followed. He didn't survive that first encounter, but the franchise brought him back starting in 1964 and recast him as one of Godzilla's most loyal allies.",
    facts: [
      "His battle with Godzilla in Godzilla Raids Again is the first monster-vs-monster fight in the franchise, period — before this, Godzilla had only ever fought humans and the military.",
      "Godzilla actually kills him in that debut film, burning him with atomic breath after wounding him — later films simply bring him back as an ally without much explanation.",
      "A camera-speed filming accident during the Osaka battle sequence gave the monster movement an unusually frantic, violent quality that the filmmakers liked enough to keep in the final cut.",
      "His design is explicitly based on Ankylosaurus, giving him a spiked shell and low, stocky build unlike most bipedal kaiju.",
      "He became one of the most frequently recurring monsters in the whole franchise, appearing across the Showa and later eras as reliable backup muscle.",
    ],
  },
  {
    slug: "gigan",
    name: "Gigan",
    tagline: "The Alien Cyborg Butcher · Since 1972",
    image: "/kaiju/gigan.jpg",
    bio: "Gigan crashed into the franchise in 1972's Godzilla vs. Gigan as a weaponized cyborg deployed by the M Space Hunter Nebula aliens, working alongside King Ghidorah in an invasion attempt. He's one of the few kaiju built rather than born or mutated, and it shows — he's less 'giant animal' and more 'giant weapon.'",
    facts: [
      "He's the first kaiju in the franchise to actually draw blood from Godzilla, making him one of the most physically brutal opponents in the series' history.",
      "His signature weapons are a buzzsaw built into his abdomen and a pair of massive hook-blades in place of hands.",
      "Despite the vicious arsenal, he's written as something of a coward — he tends to abandon his allies and flee the moment a fight turns against him.",
      "Godzilla vs. Gigan was actor Haruo Nakajima's final performance in the Godzilla suit, ending an 18-year run that started with the original 1954 film.",
      "His cyborg, alien-built design made him a favorite for later reappearances and reinterpretations, standing out from the mostly-organic kaiju roster.",
    ],
  },
  {
    slug: "destoroyah",
    name: "Destoroyah",
    tagline: "Born From the Weapon That Killed Godzilla · Since 1995",
    image: "/kaiju/destoroyah.jpg",
    bio: "Destoroyah closed out the Heisei era in 1995's Godzilla vs. Destoroyah with an origin that loops straight back to the very first film: a colony of Precambrian crustaceans, dormant for millions of years, gets mutated by the Oxygen Destroyer — the same weapon used to kill the original Godzilla back in 1954 — and evolves into a swarming, merging horror.",
    facts: [
      "His origin ties directly back to the Oxygen Destroyer from the 1954 original, closing a 40-year narrative loop for the franchise.",
      "He doesn't start out giant — Destoroyah begins as a swarm of small crab-like creatures that combine and mutate into progressively larger forms before reaching his final 'Aggregate' kaiju size.",
      "Godzilla vs. Destoroyah was made and marketed as the intended finale of the Heisei series, released for Godzilla's ongoing anniversary milestones.",
      "This film is infamous in the fandom for killing off the Heisei-era Godzilla in an on-screen nuclear meltdown death.",
      "Unlike most Toho kaiju, his design leans hard into insect and crustacean anatomy rather than the usual dinosaur-reptile mold.",
    ],
  },
  {
    slug: "biollante",
    name: "Biollante",
    tagline: "The Rose That Bites Back · Since 1989",
    image: "/kaiju/biollante.jpg",
    bio: "Biollante grew out of 1989's Godzilla vs. Biollante, a monstrous hybrid created by splicing Godzilla cells with rose plant cells and human DNA — specifically, the genetic material of a scientist's deceased daughter, whose cells had already been grafted into a rose before the experiment went further than intended.",
    facts: [
      "Her story was the winning entry in a nationwide Toho fan contest that drew over 5,000 submissions, picked from a dentist and part-time screenwriter named Shinichiro Kobayashi.",
      "Godzilla vs. Biollante was the first Godzilla film to use computer-generated imagery, though only for some schematic and diagram effects.",
      "The project was originally planned for 1986 but got shelved after a different giant-monster movie flopped at the Japanese box office; it finally got made for Godzilla's 35th anniversary in 1989.",
      "Her body combines a giant venus-flytrap-style maw with thorned, whip-like vine tentacles and a corrosive, acidic sap attack.",
      "After filming wrapped, the full-size Biollante suit reportedly ended up housing stray cats in storage on the Toho studio lot.",
    ],
  },
  {
    slug: "spacegodzilla",
    name: "SpaceGodzilla",
    tagline: "Crystal Conqueror From the Void · Since 1994",
    image: "/kaiju/spacegodzilla.jpg",
    bio: "SpaceGodzilla debuted in Godzilla vs. SpaceGodzilla (1994) as one of Godzilla's most powerful Heisei-era rivals. The film's own characters float two competing origin stories: Godzilla cells, carried into orbit either by Biollante's remains or on Mothra's wings, fell into a black hole, fused with cosmic crystalline life, and emerged from a white hole as an entirely new, hostile organism bent on conquering Earth.",
    facts: [
      "His signature Corona Beam fires from the forehead crystal and can curve mid-flight — unlike Godzilla's straight-shot atomic breath.",
      "Twin shoulder crystals grant him gravity control, letting him fly, fire gravity beams, and fling crystal shards as projectiles.",
      "Standing inside his own 'Crystal Field' lets him fire energy attacks at zero energy cost to himself.",
      "In his debut he beat Godzilla in their first clash and trapped Godzilla's adopted kaiju son in a crystal cage.",
      "He turned the city of Fukuoka into a literal crystal fortress as his base of operations.",
    ],
  },
  {
    slug: "hedorah",
    name: "Hedorah",
    tagline: "The Smog Monster · Since 1971",
    image: "/kaiju/hedorah.jpg",
    bio: "Hedorah debuted in Godzilla vs. Hedorah (1971), directed by Yoshimitsu Banno, as an enemy of Godzilla. An alien organism that crash-lands in Japanese waters and gorges on industrial pollution and sludge, growing from a tiny tadpole-like blob into a kaiju-sized menace.",
    facts: [
      "His name comes from hedoro (へどろ), Japanese for sludge, slime, or chemical ooze.",
      "The film carries one of the franchise's most explicit environmental messages, tapping into 1970s Japan's anxiety over industrial pollution rather than the Bomb.",
      "He can shift between an aquatic form, a land-walking form, and a flying form as he grows.",
      "U.S. audiences knew him under the dubbed title Godzilla vs. the Smog Monster, released by American International Pictures in February 1972.",
      "He remains one of the few Godzilla foes whose entire concept is built around a real-world ecological threat rather than a monster, alien invader, or robot.",
    ],
  },
  {
    slug: "megalon",
    name: "Megalon",
    tagline: "Seatopia's Underground God · Since 1973",
    image: "/kaiju/megalon.jpg",
    bio: "Megalon debuted in Godzilla vs. Megalon (1973). A giant insectoid kaiju worshipped as a deity by the fictional underground civilization of Seatopia, which unleashes him on the surface world in retaliation for damage nuclear testing has done to their subterranean kingdom. Mostly a Godzilla foe, though allied briefly with the cyborg kaiju Gigan against him.",
    facts: [
      "His drill-tipped forearms can be used separately in melee combat or locked together into one giant rotating drill for high-speed burrowing.",
      "He was initially guided into Tokyo by the hijacked robot Jet Jaguar — until the good guys freed Jet Jaguar and turned him against his former master.",
      "Toho shot the film in a breakneck three-week production window after a late script rewrite added Godzilla and Gigan to the story.",
      "Despite the rushed schedule, Toho still built four new monster suits for the production, including a Godzilla suit to replace one that had been in service for over five years.",
      "He's one of the most divisive Showa-era monsters among fans, often cited as a symbol of the franchise's more kid-friendly, lower-budget 1970s stretch.",
    ],
  },
  {
    slug: "king-kong",
    name: "King Kong",
    tagline: "The Eighth Wonder of the World · Since 1933",
    image: "/kaiju/king-kong.jpg",
    rightsNote:
      "Kong is not a Toho creation — he's Warner Bros./Legendary IP. Toho only ever licensed him for crossovers; ownership and origin stay separate from the rest of this roster.",
    bio: "Kong first appeared in RKO's King Kong (1933), decades before Godzilla existed. His first meeting with Godzilla came in Toho's own King Kong vs. Godzilla (1962) — a licensed crossover, not a Toho-owned character — and the pairing was revived generations later in Legendary's modern MonsterVerse, starting with Kong: Skull Island (2017).",
    facts: [
      "The 1933 original was a landmark of stop-motion animation, brought to life by effects pioneer Willis O'Brien, and is regarded as one of the most influential monster films ever made.",
      "King Kong vs. Godzilla remains the most-attended Godzilla film in Japanese theaters to this day and is credited with convincing Toho to keep the Godzilla series going after it had gone dormant for seven years.",
      "The original 1962 crossover pitch wasn't even a Godzilla idea — Willis O'Brien first pitched Kong fighting a giant Frankenstein's Monster before producer John Beck took the concept to Toho, who swapped in Godzilla.",
      "Because Kong and Godzilla are owned by different companies, every crossover — 1962's and the MonsterVerse's — required a licensing deal between Toho and the American rights holder.",
      "Kong returned as a MonsterVerse regular starting in Kong: Skull Island (2017), later sharing the screen with Godzilla again in Godzilla vs. Kong (2021) and its sequel.",
    ],
  },
  {
    slug: "mutos",
    name: "MUTOs",
    tagline: "Radiation-Hungry Titans · Since 2014",
    image: "/kaiju/mutos.jpg",
    rightsNote:
      "MUTOs (Massive Unidentified Terrestrial Organisms) are original creatures built for Legendary's MonsterVerse — not classic Toho monsters, and not connected to Toho's roster at all.",
    bio: "MUTOs debuted as the primary antagonists of Legendary's Godzilla (2014), directed by Gareth Edwards. Parasitic giant organisms that feed on radioactive material and serve as Godzilla's enemies in his MonsterVerse debut — the first Titans introduced in the modern franchise, created from scratch for these films rather than adapted from Toho lore.",
    facts: [
      "There are two: the 'Winged MUTO' (male) and the 'Eight-Legged MUTO' (female) — the female is roughly twice the male's size and, despite the nickname, has no wings.",
      "The male spends 15 years dormant, feeding off the Janjira nuclear plant, before emerging as a winged adult — a life cycle modeled on periodical cicadas.",
      "Both MUTOs sense and consume radioactive material for sustenance, from nuclear submarines and warheads to a nuclear waste repository.",
      "The female emits an EMP field that knocks out electronics for miles around her, a signature disruption to human tech during the 2014 film's climax.",
      "Creature designer Matt Allsopp spent over a year on their look, drawing on beetles and spiders — the monsters aren't literally insects, but were built to read as insect-like at a glance.",
    ],
  },
];

export function getKaiju(slug: string): Kaiju | undefined {
  return KAIJU.find((k) => k.slug === slug);
}
