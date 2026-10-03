import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { KAIJU, getKaiju } from "@/data/kaiju";

export function generateStaticParams() {
  return KAIJU.map((k) => ({ slug: k.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const kaiju = getKaiju(slug);
  if (!kaiju) return {};
  return {
    title: `${kaiju.name} | Kaiju Archive`,
    description: kaiju.tagline,
  };
}

export default async function KaijuDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const kaiju = getKaiju(slug);
  if (!kaiju) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link href="/kaiju" className="text-sm text-kaiju-400 hover:underline">
        ← Back to the directory
      </Link>

      <div className="mt-6 relative aspect-video rounded-lg overflow-hidden border border-kaiju-900/60">
        <Image
          src={kaiju.image}
          alt={kaiju.name}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      <h1 className="text-5xl font-black uppercase tracking-tight text-glow mt-8 mb-2">
        {kaiju.name}
      </h1>
      <p className="text-kaiju-400 font-semibold mb-6">{kaiju.tagline}</p>

      {kaiju.rightsNote && (
        <p className="text-xs text-atomic-orange/90 border border-atomic-orange/30 bg-atomic-orange/5 rounded-md px-4 py-3 mb-6">
          {kaiju.rightsNote}
        </p>
      )}

      <p className="text-[#eafbee]/80 leading-relaxed mb-10">{kaiju.bio}</p>

      <h2 className="text-2xl font-black uppercase tracking-wide mb-4 text-glow">
        Atomic Facts
      </h2>
      <ul className="space-y-3">
        {kaiju.facts.map((fact, i) => (
          <li
            key={i}
            className="flex gap-3 bg-white/[0.03] border border-kaiju-900/60 rounded-lg p-4"
          >
            <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-kaiju-500/20 text-kaiju-400 font-bold text-xs">
              {i + 1}
            </span>
            <p className="text-[#eafbee]/85 text-sm">{fact}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
