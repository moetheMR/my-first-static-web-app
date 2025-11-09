import React, { useEffect, useState } from 'react';

function App() {
  const [name, setName] = useState(() => localStorage.getItem('name') || 'World');

  useEffect(() => {
    localStorage.setItem('name', name);
  }, [name]);

  const container = { fontFamily: 'system-ui, sans-serif', padding: 16, lineHeight: 1.4 };
  const inputStyle = { padding: 8, fontSize: 16, marginTop: 8, display: 'block' };

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
    </div>
  );
}

export default App;
