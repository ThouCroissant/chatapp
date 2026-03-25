import { useEffect, useRef } from 'react';
import './MessageList.css';

function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function MessageList({ messages, myName }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="message-list">
      {messages.length === 0 && (
        <p className="empty">No messages yet. Say something!</p>
      )}
      {messages.map((msg) => {
        if (msg.type === 'system') {
          return (
            <div key={msg.id} className="system-msg">
              {msg.text}
            </div>
          );
        }
        const isMe = msg.name === myName;
        return (
          <div key={msg.id} className={`msg-row ${isMe ? 'me' : ''}`}>
            {!isMe && <span className="msg-name">{msg.name}</span>}
            <div className="msg-bubble">
              <span className="msg-text">{msg.text}</span>
              <span className="msg-time">{formatTime(msg.timestamp)}</span>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
