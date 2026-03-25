import { useState } from 'react';
import './MessageInput.css';

export default function MessageInput({ onSend }) {
  const [text, setText] = useState('');

  const send = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText('');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="input-bar">
      <input
        className="msg-input"
        type="text"
        placeholder="Type a message…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKey}
        autoFocus
        maxLength={500}
      />
      <button className="send-btn" onClick={send} disabled={!text.trim()}>
        Send
      </button>
    </div>
  );
}
