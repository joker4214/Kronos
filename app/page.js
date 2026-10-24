import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Kronos Running</h1>
      <p>Content generation agent is live.</p>
      <p>
        <Link href="/widgets">AI Widgets →</Link>
      </p>
    </div>
  );
}
