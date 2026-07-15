'use client';

import { useEffect, useState } from 'react';

export default function TeamAvatar({ photo, name, initial }) {
  const [mounted, setMounted] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!photo || failed || !mounted) {
    return initial;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/${photo}`}
      alt={name}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      onError={() => setFailed(true)}
    />
  );
}
