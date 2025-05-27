import React, { useState, useEffect } from "react";

function Chat() {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);

  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [formResults, setFormResults] = useState(null);

  // Load templates on initial render
  useEffect(() => {
    fetch("http://localhost:8000/templates")
      .then((res) => res.json())
      .then((data) => setTemplates(data));
  }, []);

  // Handle free chat send
  const handleSend = async () => {
    if (!chatInput.trim()) return;
    const userMessage = { sender: "user", text: chatInput };
    setMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    const response = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: chatInput }),
    });

    const data = await response.json();
    const botMessage = { sender: "bot", text: data.response, agent: data.agent };
    setMessages((prev) => [...prev, botMessage]);
  };

  // Handle guided template submit
  const handleTemplateSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/templates/execute", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        template_id: selectedTemplate.id,
        params: formData,
      }),
    });
    const data = await response.json();
    setFormResults(data.results);
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "800px", margin: "auto" }}>
      <h1>🧠 Agentic Chatbot</h1>

      {/* Guided Prompt Mode */}
      {!selectedTemplate && (
        <div style={{ marginBottom: "1rem" }}>
          <h3>🧭 Guided Prompts</h3>
          {templates.map((tpl) => (
            <button
              key={tpl.id}
              style={{ margin: "0.25rem" }}
              onClick={() => {
                setSelectedTemplate(tpl);
                setFormData({});
                setFormResults(null);
              }}
            >
              {tpl.name}
            </button>
          ))}
        </div>
      )}

      {/* Guided Template Form */}
      {selectedTemplate && (
        <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <h3>{selectedTemplate.name}</h3>
          <p>{selectedTemplate.description}</p>
          <form onSubmit={handleTemplateSubmit}>
            {selectedTemplate.parameters.map((param) => (
              <div key={param.name} style={{ marginBottom: "0.5rem" }}>
                <label>{param.label}: </label>
                <input
                  type={param.type === "number" ? "number" : "text"}
                  value={formData[param.name] || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, [param.name]: e.target.value }))
                  }
                  required
                />
              </div>
            ))}
            <button type="submit">Run Agents</button>
          </form>
          {formResults && (
            <div style={{ marginTop: "1rem" }}>
              <h4>🧪 Agent Results:</h4>
              <ul>
                {formResults.map((res, i) => (
                  <li key={i}>{res}</li>
                ))}
              </ul>
              <button onClick={() => setSelectedTemplate(null)}>Back to Prompts</button>
            </div>
          )}
        </div>
      )}

      {/* Free Chat Mode */}
      {!selectedTemplate && (
        <>
          <h3>💬 Free Chat Mode</h3>
          <div style={{ border: "1px solid #ccc", padding: "1rem", minHeight: "200px", marginBottom: "1rem" }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
                <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
                {msg.agent && (
                  <div style={{ fontSize: "0.8em", fontStyle: "italic", color: "#777" }}>
                    Handled by: {msg.agent}
                  </div>
                )}
              </div>
            ))}
          </div>
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Type your message..."
            style={{ width: "70%", padding: "0.5rem" }}
          />
          <button onClick={handleSend} style={{ padding: "0.5rem 1rem", marginLeft: "0.5rem" }}>
            Send
          </button>
        </>
      )}
    </div>
  );
}

export default Chat;