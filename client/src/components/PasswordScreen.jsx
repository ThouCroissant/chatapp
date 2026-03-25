import { useState } from 'react';
import './Screen.css';

export default function PasswordScreen({ socket, onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = () => {
    if (!password.trim()) return;
    setLoading(true);
    setError('');
    socket.emit('verify_password', password, (res) => {
      setLoading(false);
      if (res.success) {
        onSuccess();
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
        <h1 className="card-title">ChatRoom</h1>
        <p className="card-sub">Enter the room password to join</p>
        <input
          className="input"
          type="password"
          placeholder="Room password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKey}
          autoFocus
        />
        {error && <p className="error">{error}</p>}
        <button className="btn" onClick={submit} disabled={loading}>
          {loading ? 'Checking…' : 'Enter'}
        </button>
      </div>
    </div>
  );
}
