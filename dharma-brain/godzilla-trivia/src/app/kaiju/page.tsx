import Image from "next/image";
import Link from "next/link";
import { KAIJU } from "@/data/kaiju";

export const metadata = {
  title: "Meet the Kaiju | Kaiju Archive",
  description: "Godzilla's allies, rivals, and crossover legends — with facts and art for each.",
};

export default function KaijuDirectory() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-14">
        <p className="uppercase tracking-[0.3em] text-kaiju-400 text-sm font-semibold mb-4">
          The Directory
        </p>
        <h1 className="text-5xl sm:text-6xl font-black uppercase tracking-tight text-glow mb-4">
          Meet the Kaiju
        </h1>
        <p className="max-w-2xl mx-auto text-[#eafbee]/70">
          Allies, rivals, and crossover legends from more than 70 years of monster cinema.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {KAIJU.map((k) => (
          <Link
            key={k.slug}
            href={`/kaiju/${k.slug}`}
            className="group block bg-white/[0.03] border border-kaiju-900/60 rounded-lg overflow-hidden hover:border-kaiju-500/60 transition-colors"
          >
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={k.image}
                alt={k.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-black uppercase tracking-wide mb-1">{k.name}</h2>
              <p className="text-sm text-kaiju-400 mb-2">{k.tagline}</p>
              <p className="text-sm text-[#eafbee]/60 line-clamp-3">{k.bio}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
