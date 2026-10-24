"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function WidgetsPage() {
  const [widgets, setWidgets] = useState(null);

  useEffect(() => {
    fetch("/api/widgets")
      .then((r) => r.json())
      .then(setWidgets)
      .catch(() => setWidgets([]));
  }, []);

  return (
    <div className="container">
      <div className="page-header">
        <h1>AI Widgets</h1>
        <Link href="/widgets/new" className="btn">
          + New Widget
        </Link>
      </div>

      {widgets === null && <p className="help-text">Loading...</p>}

      {widgets !== null && widgets.length === 0 && (
        <div className="card empty-state">
          <p>No widgets yet.</p>
          <Link href="/widgets/new" className="btn" style={{ marginTop: 12 }}>
            Create your first widget
          </Link>
        </div>
      )}

      {widgets && widgets.length > 0 && (
        <div className="widget-list">
          {widgets.map((w) => (
            <Link key={w.id} href={`/widgets/${w.id}`} className="widget-row">
              <div>
                <div>{w.name}</div>
                <div className="meta">{w.clients?.name || "Unknown client"}</div>
              </div>
              <span className={`badge ${w.status}`}>{w.status}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
