"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewWidgetPage() {
  const router = useRouter();
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const [newClientName, setNewClientName] = useState("");
  const [widgetName, setWidgetName] = useState("");
  const [creatingClient, setCreatingClient] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/clients")
      .then((r) => r.json())
      .then((data) => {
        setClients(data);
        if (data.length) setClientId(data[0].id);
        else setCreatingClient(true);
      });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      let finalClientId = clientId;

      if (creatingClient) {
        if (!newClientName.trim()) {
          throw new Error("Client name is required");
        }
        const res = await fetch("/api/clients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newClientName.trim() }),
        });
        const client = await res.json();
        if (!res.ok) throw new Error(client.error || "Failed to create client");
        finalClientId = client.id;
      }

      if (!widgetName.trim()) {
        throw new Error("Widget name is required");
      }

      const res = await fetch("/api/widgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client_id: finalClientId, name: widgetName.trim() }),
      });
      const widget = await res.json();
      if (!res.ok) throw new Error(widget.error || "Failed to create widget");

      router.push(`/widgets/${widget.id}`);
    } catch (err) {
      setError(err.message);
      setSubmitting(false);
    }
  }

  return (
    <div className="container" style={{ maxWidth: 520 }}>
      <Link href="/widgets" className="back-link">
        ← Back to widgets
      </Link>
      <div className="page-header">
        <h1>New Widget</h1>
      </div>

      <form onSubmit={handleSubmit} className="card">
        <div className="field">
          <label className="label">Client</label>
          {!creatingClient && clients.length > 0 && (
            <select
              className="input"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
            >
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          )}
          {creatingClient && (
            <input
              className="input"
              placeholder="New client name"
              value={newClientName}
              onChange={(e) => setNewClientName(e.target.value)}
            />
          )}
          <button
            type="button"
            onClick={() => setCreatingClient(!creatingClient)}
            className="help-text"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0, marginTop: 6, textDecoration: "underline" }}
          >
            {creatingClient ? "Pick an existing client instead" : "+ Add a new client"}
          </button>
        </div>

        <div className="field">
          <label className="label">Widget name</label>
          <input
            className="input"
            placeholder="e.g. Platinum Plumbing Website Agent"
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
          />
        </div>

        {error && (
          <p className="help-text" style={{ color: "var(--danger)" }}>
            {error}
          </p>
        )}

        <button type="submit" className="btn" disabled={submitting}>
          {submitting ? "Creating..." : "Create Widget"}
        </button>
      </form>
    </div>
  );
}
