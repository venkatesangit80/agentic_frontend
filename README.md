# 💬 Agentic Chatbot Frontend (React)

This is the React-based frontend for the **Agentic AI Chatbot**, which communicates with a rule-based FastAPI backend. It provides a clean chat interface with visible agent trace, designed for transparency and modularity.

---

## 🚀 Features

- Simple, responsive chat UI built with React
- Communicates with FastAPI backend at `http://localhost:8000`
- Displays which agent handled the response
- Handles spam and profanity gracefully
- Extensible component design

---

## 📦 Tech Stack

- React (via Create React App)
- JavaScript (ES6)
- CSS (inline styles for simplicity)

---

## 📁 Project Structure

```
agentic-chatbot-frontend/
├── public/
├── src/
│   ├── App.js
│   ├── Chat.jsx
│   └── index.js
├── package.json
└── README.md
```

---

## 🛠 Setup & Run

### 1. Clone or Create the Project

If you haven't created the app yet:

```bash
npx create-react-app agentic-chatbot-frontend
cd agentic-chatbot-frontend
```

Then, add the `Chat.jsx` component as described.

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the App

```bash
npm start
```

Open your browser and navigate to:

```
http://localhost:3000
```

---

## 🔗 Backend Integration

Ensure the backend is running at:

```
http://localhost:8000
```

This is required for the chat to function.

---

## 💡 Example Messages

| User Input                | Bot Response                          | Agent           |
|---------------------------|----------------------------------------|------------------|
| `help`                    | Shows help text                        | `help`           |
| `what is the server health` | Shows CPU and memory usage            | `server health`  |
| `buy now it is good`      | Warns about spam                       | `moderation`     |

---

## 📌 Future Enhancements

- Add typing indicator
- Improve UI with animations and avatars
- Integrate session history
- Add context-aware agents

---

## 🧑‍💻 Author

Built as part of an Agentic AI prototype by Venkatesan Subramanian. Frontend talks to a FastAPI backend that performs agent selection using a factory method.
