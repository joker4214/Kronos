'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '@/styles/seoTool.module.css';

const SEVERITY_LABEL = { critical: 'Fix now', warning: 'Worth fixing', info: 'Nice to have' };

function ScoreRing({ score }) {
  const color = score >= 80 ? '#3fbf6f' : score >= 50 ? '#e0a530' : '#e05353';
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className={styles.scoreRing}>
      <svg viewBox="0 0 120 120" width="140" height="140">
        <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
        <circle
          cx="60" cy="60" r="54" fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div className={styles.scoreNumber}>{score}</div>
    </div>
  );
}

function IssueCard({ issue }) {
  return (
    <div className={`${styles.issueCard} ${styles[`issue-${issue.severity}`]}`}>
      <div className={styles.issueHead}>
        <span className={styles.issueBadge}>{SEVERITY_LABEL[issue.severity]}</span>
        <h4>{issue.title}</h4>
      </div>
      <p className={styles.issueWhy}>{issue.why}</p>
      <p className={styles.issueFix}><strong>Quick fix:</strong> {issue.fix}</p>
    </div>
  );
}

export default function SeoAnalyzer() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('idle');
  const [report, setReport] = useState(null);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [leadStatus, setLeadStatus] = useState('idle');

  async function handleScan(e) {
    e.preventDefault();
    setStatus('scanning');
    setError('');
    setReport(null);
    setUnlocked(false);
    try {
      const res = await fetch('/api/seo-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not scan that store.');
      setReport(data);
      setStatus('scanned');
    } catch (err) {
      setError(err.message || 'Something went wrong scanning that store.');
      setStatus('error');
    }
  }

  async function handleUnlock(e) {
    e.preventDefault();
    setLeadStatus('saving');
    try {
      const res = await fetch('/api/seo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, scannedUrl: report?.url, score: report?.score }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not save that.');
      setLeadStatus('saved');
      setUnlocked(true);
    } catch (err) {
      setLeadStatus('error');
    }
  }

  const teaserIssues = report?.issues?.slice(0, 1) || [];
  const restIssues = report?.issues?.slice(1) || [];

  return (
    <div className={styles.wrap}>
      <form className={styles.scanForm} onSubmit={handleScan}>
        <input
          type="text"
          inputMode="url"
          placeholder="yourstorename.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={styles.scanInput}
          required
        />
        <button type="submit" className={styles.scanBtn} disabled={status === 'scanning'}>
          {status === 'scanning' ? 'Scanning…' : 'Scan my store'}
        </button>
      </form>

      {status === 'error' && <p className={styles.errorText}>{error}</p>}

      {report && (
        <div className={styles.report}>
          <div className={styles.reportHead}>
            <ScoreRing score={report.score} />
            <div>
              <div className={styles.reportUrl}>{report.url}</div>
              <div className={styles.countsRow}>
                <span className={styles.countCritical}>{report.counts.critical} fix now</span>
                <span className={styles.countWarning}>{report.counts.warning} worth fixing</span>
                <span className={styles.countInfo}>{report.counts.info} nice to have</span>
              </div>
            </div>
          </div>

          {teaserIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}

          {!unlocked && restIssues.length > 0 && (
            <div className={styles.gate}>
              <p className={styles.gateHeadline}>
                {restIssues.length} more thing{restIssues.length === 1 ? '' : 's'} found — see the full list and exactly how to fix each one.
              </p>
              <form className={styles.gateForm} onSubmit={handleUnlock}>
                <input
                  type="email"
                  placeholder="you@yourstore.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.gateInput}
                  required
                />
                <button type="submit" className={styles.scanBtn} disabled={leadStatus === 'saving'}>
                  {leadStatus === 'saving' ? 'Unlocking…' : 'Show the full report'}
                </button>
              </form>
              {leadStatus === 'error' && <p className={styles.errorText}>Could not save that — try again.</p>}
              <p className={styles.gateNote}>No spam. Just your results, and occasionally something worth reading.</p>
            </div>
          )}

          {unlocked && restIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}

          {unlocked && (
            <div className={styles.ctaRow}>
              <p>That is the full list. Want us to just do the fixes for you?</p>
              <Link href="/shopify-audit" className={styles.ctaBtn}>See Shopify Store Audits</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
