'use client';

import { useState, useEffect } from 'react';
import Dashboard from '@/components/Dashboard';
import Styles from '@/styles/page.module.css';

export default function AdminHome() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if system is ready
    const checkSystem = async () => {
      try {
        const response = await fetch('/api/system/status');
        if (!response.ok) throw new Error('System not ready');
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    checkSystem();
  }, []);

  if (loading) {
    return (
      <div className={Styles.container}>
        <div className={Styles.loadingSpinner}>
          <h2>Loading Kronos...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={Styles.container}>
        <div className={Styles.errorBox}>
          <h2>System Error</h2>
          <p>{error}</p>
          <p>Make sure your database is configured and running.</p>
        </div>
      </div>
    );
  }

  return <Dashboard />;
}
