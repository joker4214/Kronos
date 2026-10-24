"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const TABS = ["Knowledge", "Lead Routing", "Test", "Appearance", "Deploy"];

export default function WidgetDetailPage() {
  const { id } = useParams();
  const [widget, setWidget] = useState(null);
  const [knowledge, setKnowledge] = useState([]);
  const [tab, setTab] = useState("Knowledge");

  function reloadWidget() {
    fetch(`/api/widgets/${id}`)
      .then((r) => r.json())
      .then(setWidget);
  }

  function reloadKnowledge() {
    fetch(`/api/widgets/${id}/knowledge`)
      .then((r) => r.json())
      .then(setKnowledge);
  }

  useEffect(() => {
    if (!id) return;
    reloadWidget();
    reloadKnowledge();
  }, [id]);

  if (!widget) {
    return (
      <div className="container">
        <p className="help-text">Loading...</p>
      </div>
    );
  }

  const appearance = widget.widget_appearance?.[0];
  const routing = widget.widget_lead_routing?.[0];

  return (
    <div className="container">
      <Link href="/widgets" className="back-link">
        ← Back to widgets
      </Link>
      <div className="page-header">
        <div>
          <h1>{widget.name}</h1>
          <div className="meta" style={{ marginTop: 4 }}>
            {widget.clients?.name}
          </div>
        </div>
        <span className={`badge ${widget.status}`}>{widget.status}</span>
      </div>

      <div className="tabs">
        {TABS.map((t) => (
          <button
            key={t}
            className={`tab ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Knowledge" && (
        <KnowledgeTab
          widgetId={id}
          knowledge={knowledge}
          onChange={reloadKnowledge}
        />
      )}
      {tab === "Lead Routing" && (
        <LeadRoutingTab widgetId={id} routing={routing} onChange={reloadWidget} />
      )}
      {tab === "Test" && <TestTab widgetId={id} />}
      {tab === "Appearance" && (
        <AppearanceTab widgetId={id} appearance={appearance} onChange={reloadWidget} />
      )}
      {tab === "Deploy" && <DeployTab widgetId={id} widget={widget} onChange={reloadWidget} />}
    </div>
  );
}

function KnowledgeTab({ widgetId, knowledge, onChange }) {
  const [url, setUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function addWebsite(e) {
    e.preventDefault();
    if (!url.trim()) return;
    setBusy(true);
    setError("");
    const res = await fetch(`/api/widgets/${widgetId}/knowledge`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "website", source_url: url.trim() }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Failed to scrape that URL");
    }
    setUrl("");
    setBusy(false);
    onChange();
  }

  async function addFaq(e) {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) return;
    setBusy(true);
    await fetch(`/api/widgets/${widgetId}/knowledge`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "faq", question: question.trim(), answer: answer.trim() }),
    });
    setQuestion("");
    setAnswer("");
    setBusy(false);
    onChange();
  }

  async function removeSource(sourceId) {
    await fetch(`/api/widgets/${widgetId}/knowledge/${sourceId}`, { method: "DELETE" });
    onChange();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="card">
        <p className="section-title">Website</p>
        <form onSubmit={addWebsite} className="row">
          <input
            className="input"
            placeholder="https://clientsite.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="btn" disabled={busy} style={{ flex: "0 0 auto" }}>
            {busy ? "Scraping..." : "Scan Site"}
          </button>
        </form>
        {error && (
          <p className="help-text" style={{ color: "var(--danger)" }}>
            {error}
          </p>
        )}
      </div>

      <div className="card">
        <p className="section-title">FAQs</p>
        <form onSubmit={addFaq}>
          <div className="field">
            <input
              className="input"
              placeholder="Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <div className="field">
            <textarea
              className="input"
              rows={2}
              placeholder="Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
          </div>
          <button className="btn" disabled={busy}>
            Add FAQ
          </button>
        </form>
      </div>

      <div className="card">
        <p className="section-title">Sources ({knowledge.length})</p>
        {knowledge.length === 0 && <p className="help-text">Nothing added yet.</p>}
        {knowledge.map((k) => (
          <div key={k.id} className="knowledge-item">
            <div>
              <div style={{ fontSize: 14 }}>
                {k.type === "website" && k.source_url}
                {k.type === "faq" && k.question}
                {k.type === "file" && k.file_name}
              </div>
              <div className="meta">
                <span className={`badge ${k.status === "ready" ? "deployed" : k.status === "pending" ? "testing" : ""}`}>
                  {k.status}
                </span>{" "}
                {k.type}
              </div>
            </div>
            <button className="btn secondary" onClick={() => removeSource(k.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeadRoutingTab({ widgetId, routing, onChange }) {
  const [emailEnabled, setEmailEnabled] = useState(routing?.email_enabled || false);
  const [emails, setEmails] = useState(routing?.notification_emails || []);
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    setEmailEnabled(routing?.email_enabled || false);
    setEmails(routing?.notification_emails || []);
  }, [routing]);

  async function save(next) {
    await fetch(`/api/widgets/${widgetId}/lead-routing`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    onChange();
  }

  function addEmail(e) {
    e.preventDefault();
    if (!newEmail.trim()) return;
    const next = [...emails, newEmail.trim()];
    setEmails(next);
    setNewEmail("");
    save({ notification_emails: next });
  }

  function removeEmail(email) {
    const next = emails.filter((e) => e !== email);
    setEmails(next);
    save({ notification_emails: next });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div className="card">
        <div className="toggle-row">
          <div>
            <div>Email notifications</div>
            <div className="help-text">Get an email when the agent captures a lead</div>
          </div>
          <input
            type="checkbox"
            checked={emailEnabled}
            onChange={(e) => {
              setEmailEnabled(e.target.checked);
              save({ email_enabled: e.target.checked });
            }}
          />
        </div>

        <form onSubmit={addEmail} className="row" style={{ marginTop: 14 }}>
          <input
            className="input"
            placeholder="notify@yourcompany.com"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button className="btn" style={{ flex: "0 0 auto" }}>
            Add
          </button>
        </form>

        <div className="chip-list">
          {emails.map((email) => (
            <div key={email} className="chip">
              {email}
              <button onClick={() => removeEmail(email)}>×</button>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="toggle-row">
          <div>
            <div>Google Sheets</div>
            <div className="help-text">Coming soon — needs a Google service account set up first</div>
          </div>
          <input type="checkbox" disabled />
        </div>
      </div>
    </div>
  );
}

function TestTab({ widgetId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  async function send(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const history = messages.map((m) => ({ role: m.role, content: m.content }));
    const nextMessages = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);

    const res = await fetch(`/api/widgets/${widgetId}/test`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, history }),
    });
    const data = await res.json();
    setMessages([...nextMessages, { role: "assistant", content: data.reply || "Error getting a response." }]);
    setSending(false);
  }

  return (
    <div className="card">
      <p className="section-title">Test the agent against its current knowledge</p>
      <div className="chat-window">
        <div className="chat-messages">
          {messages.length === 0 && <p className="help-text">Say something to start testing.</p>}
          {messages.map((m, i) => (
            <div key={i} className={`chat-bubble ${m.role}`}>
              {m.content}
            </div>
          ))}
        </div>
        <form onSubmit={send} className="chat-input-row">
          <input
            className="input"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn" disabled={sending} style={{ flex: "0 0 auto" }}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

function AppearanceTab({ widgetId, appearance, onChange }) {
  const [form, setForm] = useState(appearance || {});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm(appearance || {});
  }, [appearance]);

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    await fetch(`/api/widgets/${widgetId}/appearance`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        theme_mode: form.theme_mode,
        theme_color: form.theme_color,
        width: Number(form.width),
        height: Number(form.height),
        auto_open: form.auto_open,
        greeting_message: form.greeting_message,
      }),
    });
    setSaving(false);
    onChange();
  }

  return (
    <form onSubmit={save} className="card">
      <div className="row">
        <div className="field">
          <label className="label">Theme</label>
          <select
            className="input"
            value={form.theme_mode || "dark"}
            onChange={(e) => setForm({ ...form, theme_mode: e.target.value })}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
        <div className="field">
          <label className="label">Accent color</label>
          <input
            className="input"
            type="color"
            value={form.theme_color || "#4A7C59"}
            onChange={(e) => setForm({ ...form, theme_color: e.target.value })}
          />
        </div>
      </div>

      <div className="row">
        <div className="field">
          <label className="label">Width (px)</label>
          <input
            className="input"
            type="number"
            value={form.width || 400}
            onChange={(e) => setForm({ ...form, width: e.target.value })}
          />
        </div>
        <div className="field">
          <label className="label">Height (px)</label>
          <input
            className="input"
            type="number"
            value={form.height || 700}
            onChange={(e) => setForm({ ...form, height: e.target.value })}
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Greeting message</label>
        <textarea
          className="input"
          rows={2}
          value={form.greeting_message || ""}
          onChange={(e) => setForm({ ...form, greeting_message: e.target.value })}
        />
      </div>

      <div className="toggle-row" style={{ border: "none", padding: "0 0 16px" }}>
        <div>Auto-open on page load</div>
        <input
          type="checkbox"
          checked={form.auto_open || false}
          onChange={(e) => setForm({ ...form, auto_open: e.target.checked })}
        />
      </div>

      <button className="btn" disabled={saving}>
        {saving ? "Saving..." : "Save Appearance"}
      </button>
    </form>
  );
}

function DeployTab({ widgetId, widget, onChange }) {
  const [snippet, setSnippet] = useState(null);
  const [deploying, setDeploying] = useState(false);
  const [copied, setCopied] = useState(false);

  async function deploy() {
    setDeploying(true);
    const res = await fetch(`/api/widgets/${widgetId}/deploy`, { method: "PATCH" });
    const data = await res.json();
    setSnippet(data.embedSnippet);
    setDeploying(false);
    onChange();
  }

  function copy() {
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const embedUrl = typeof window !== "undefined"
    ? `${window.location.origin}/api/widget/${widgetId}/embed.js`
    : "";
  const existingSnippet = `<script src="${embedUrl}" async></script>`;

  return (
    <div className="card">
      <p className="section-title">Embed on the client's site</p>
      <p className="help-text">
        Paste this snippet before the closing &lt;/body&gt; tag on the client's website.
      </p>

      {widget.status === "deployed" ? (
        <div className="embed-code" style={{ marginTop: 14 }}>
          {existingSnippet}
        </div>
      ) : (
        <button className="btn" onClick={deploy} disabled={deploying} style={{ marginTop: 14 }}>
          {deploying ? "Deploying..." : "Deploy Widget"}
        </button>
      )}

      {snippet && (
        <>
          <div className="embed-code" style={{ marginTop: 14 }}>
            {snippet}
          </div>
          <button className="btn secondary" onClick={copy} style={{ marginTop: 10 }}>
            {copied ? "Copied!" : "Copy snippet"}
          </button>
        </>
      )}
    </div>
  );
}
