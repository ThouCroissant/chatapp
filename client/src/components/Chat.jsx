import { useState, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import './Chat.css';

export default function Chat({ socket, myName }) {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const onMessage = (msg) => setMessages((prev) => [...prev, { ...msg, type: 'message' }]);
    const onSystem = (text) =>
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + Math.random(), text, type: 'system', timestamp: new Date().toISOString() },
      ]);
    const onUserList = (list) => setUsers(list);

    socket.on('new_message', onMessage);
    socket.on('system_message', onSystem);
    socket.on('user_list', onUserList);

    return () => {
      socket.off('new_message', onMessage);
      socket.off('system_message', onSystem);
      socket.off('user_list', onUserList);
    };
  }, [socket]);

  const sendMessage = (text) => {
    socket.emit('send_message', text);
  };

  return (
    <div className="chat-layout">
      <aside className="sidebar">
        <h2 className="sidebar-title">Online</h2>
        <ul className="user-list">
          {users.map((u) => (
            <li key={u} className={`user-item ${u === myName ? 'me' : ''}`}>
              <span className="user-dot" />
              {u} {u === myName && <span className="you-tag">you</span>}
            </li>
          ))}
        </ul>
      </aside>
      <div className="chat-main">
        <header className="chat-header">
          <span className="header-title">ChatRoom</span>
          <span className="header-you">you are <strong>{myName}</strong></span>
        </header>
        <MessageList messages={messages} myName={myName} />
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
}
