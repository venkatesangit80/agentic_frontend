import React, { useState } from 'react';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);

    try {
      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();
      const botMsg = {
        sender: 'bot',
        text: data.response,
        agent: data.agent
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: '❌ Error contacting server.' }]);
    }

    setInput('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>🧠 Agentic Chatbot</h2>
      <div style={{ border: '1px solid #ccc', padding: '10px', height: '400px', overflowY: 'auto' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: '10px', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
            <div><strong>{msg.sender === 'user' ? 'You' : 'Bot'}</strong>: {msg.text}</div>
            {msg.agent && msg.sender === 'bot' && (
              <div style={{ fontSize: '0.8em', fontStyle: 'italic', color: '#888' }}>
                Handled by: {msg.agent}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '10px' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          style={{ width: '80%', padding: '8px' }}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} style={{ padding: '8px 12px', marginLeft: '5px' }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;