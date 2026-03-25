import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import PasswordScreen from './components/PasswordScreen';
import NamePicker from './components/NamePicker';
import Chat from './components/Chat';

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001';
const socket = io(SERVER_URL, { autoConnect: false });

export default function App() {
  const [step, setStep] = useState('password'); // 'password' | 'name' | 'chat'
  const [myName, setMyName] = useState('');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.connect();
    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));
    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const handlePasswordSuccess = () => setStep('name');

  const handleNameSuccess = (name) => {
    setMyName(name);
    setStep('chat');
  };

  if (step === 'password') {
    return <PasswordScreen socket={socket} onSuccess={handlePasswordSuccess} />;
  }
  if (step === 'name') {
    return <NamePicker socket={socket} onSuccess={handleNameSuccess} />;
  }
  return <Chat socket={socket} myName={myName} />;
}
