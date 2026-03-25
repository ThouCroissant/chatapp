import { useState } from 'react';
import './Screen.css';

export default function NamePicker({ socket, onSuccess }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = () => {
    const trimmed = name.trim().toLowerCase();
    if (trimmed.length !== 3 || !/^[a-z]+$/.test(trimmed)) {
      setError('Must be exactly 3 letters (a–z), no numbers or symbols.');
      return;
    }
    setLoading(true);
    setError('');
    socket.emit('pick_name', trimmed, (res) => {
      setLoading(false);
      if (res.success) {
        onSuccess(res.name);
      } else {
        setError(res.error);
      }
    });
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') submit();
  };

  return (
    <div className="screen">
      <div className="card">
        <h1 className="card-title">Pick your name</h1>
        <p className="card-sub">Choose a 3-letter word to identify yourself</p>
        <input
          className="input"
          type="text"
          placeholder="e.g. fox, sky, ace"
          maxLength={3}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKey}
          autoFocus
        />
        {error && <p className="error">{error}</p>}
        <button className="btn" onClick={submit} disabled={loading}>
          {loading ? 'Joining…' : 'Join Chat'}
        </button>
      </div>
    </div>
  );
}
