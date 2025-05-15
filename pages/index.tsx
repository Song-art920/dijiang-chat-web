import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages })
    });

    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
  };

  return (
    <div style={{ padding: 20, background: "black", color: "white", minHeight: "100vh" }}>
      <h1 style={{ fontSize: 32 }}>💬 Talk to Dijiang</h1>
      <div>
        {messages.map((msg, i) => (
          <div key={i} style={{ margin: "10px 0" }}>
            <strong>{msg.role === "user" ? "You" : "Dijiang"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        style={{ width: "80%", padding: 10, marginTop: 20 }}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && sendMessage()}
        placeholder="Ask something..."
      />
    </div>
  );
}
