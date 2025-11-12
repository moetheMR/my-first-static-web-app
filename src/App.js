import React, { useCallback, useEffect, useState } from 'react';

function App() {
  const [name, setName] = useState(() => localStorage.getItem('name') || 'World');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMessage = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/message');
      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }
      const data = await res.json();
      setMessage(data?.text || 'No message from the API.');
    } catch (err) {
      setError(err.message || 'Failed to load API message');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessage();
    // The dependency array includes fetchMessage.
    // Thanks to useCallback, this effect will still only run once on mount.
  }, [fetchMessage]);

  useEffect(() => {
    localStorage.setItem('name', name);
  }, [name]);

const container = { fontFamily: 'system-ui, sans-serif', padding: 16, lineHeight: 1.4 };
const inputStyle = { padding: 8, fontSize: 16, marginTop: 8, display: 'block' };
const buttonStyle = { padding: 8, fontSize: 16, marginTop: 8, display: 'inline-block' };

  return (
    <div style={container}>
      <h1>Hello {name}</h1>
      <label htmlFor="name">Your name</label>
      <input
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Type your name"
        style={inputStyle}
      />
      <div style={{ marginTop: 16 }}>
        <h2>Message from API</h2>
        <button onClick={fetchMessage} disabled={loading} style={buttonStyle}>
          {loading ? 'Loading…' : 'Refresh'}
        </button>
        <p aria-live="polite" style={{ marginTop: 8 }}>
          {error ? error : message}
        </p>
      </div>
    </div>
  );
}

export default App;
