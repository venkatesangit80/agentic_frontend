# 🧠 Agentic AI Chatbot Backend

This is a **rule-based and guided agentic chatbot backend** built using **FastAPI**, designed to simulate agentic AI behavior without using any LLMs. It routes user messages to specialized agent functions based on:

- **Freeform keyword detection**, or  
- **Guided agent templates** using a multi-agent execution pipeline

It includes built-in **content moderation** (profanity and spam filtering), and is fully modular, extensible, and integrated with a React frontend.

---

## 📁 Project Structure

```
.
├── app/
│   ├── main.py                         # FastAPI app with chat + template API
│   ├── templates.py                    # Guided agent template registry
│   ├── agents/
│   │   ├── __init__.py
│   │   ├── capacity_management.py      # Agent: server health
│   │   ├── support.py                  # Agents: help, default
│   └── filters/
│       ├── __init__.py
│       └── content_check.py            # Profanity and spam filters
├── requirements.txt
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/agentic-chatbot-backend.git
cd agentic-chatbot-backend
```

### 2. Set Up Python Environment

```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 🧪 Running the Server

Run the FastAPI app using **uvicorn**:

```bash
uvicorn app.main:app --reload
```

This will start the server at:

```
http://localhost:8000
```

---

## 🧠 API Endpoints

### 🔹 POST `/chat`

**Use case**: Freeform message analysis via keyword rules

**Request:**
```json
{
  "message": "Check server health"
}
```

**Response:**
```json
{
  "response": "✅ Server Health: CPU usage at 42%, Memory usage at 68%",
  "agent": "server health"
}
```

---

### 🔹 GET `/templates`

**Use case**: Get list of available guided prompt templates

**Response:**
```json
[
  {
    "id": "welcome_health_check",
    "name": "Welcome + Server Health",
    "description": "Greets user and checks system health",
    "parameters": [
      { "name": "name", "label": "User Name", "type": "string" }
    ]
  }
]
```

---

### 🔹 POST `/templates/execute`

**Use case**: Guided agentic execution (executes multiple agents)

**Request:**
```json
{
  "template_id": "welcome_health_check",
  "params": {
    "name": "Sarangan"
  }
}
```

**Response:**
```json
{
  "template": "Welcome + Server Health",
  "parameters": {
    "name": "Sarangan"
  },
  "results": [
    "Hello, Sarangan! Welcome to our service.",
    "Sarangan, your CPU usage is at 55%, memory at 70%."
  ]
}
```

---

## 🧩 How to Add a New Agent

1. **Create a new async function** in any file under `app/agents/`:

```python
async def system_check(params: dict) -> str:
    name = params.get("name", "Unknown")
    return f"Running full diagnostics on {name}... All systems stable."
```

2. **Add it to a template** in `app/templates.py`:

```python
from app.agents.capacity_management import server_health
from app.agents.diagnostics import system_check

TEMPLATES = [
  {
    "id": "full_diagnostics",
    "name": "System + Health Check",
    "description": "Performs full system diagnostics and health check.",
    "parameters": [
      { "name": "name", "label": "System Name", "type": "string" }
    ],
    "agents": [system_check, server_health]
  }
]
```

3. **Restart your FastAPI server** – new prompt will auto-appear in the UI.

---

## 🔒 Content Moderation

Handled via `app/filters/content_check.py`:
- ✅ Profanity filtering (via `better_profanity`)
- 🚫 Spam detection (repetitive or suspicious text)

---

## 🌐 CORS Support

CORS is enabled to allow requests from a React frontend (e.g. `http://localhost:3000`).

---

## 📦 Example Test (Free Chat)

```bash
curl -X POST http://localhost:8000/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "show me server health"}'
```

---

## 📌 To-Do / Roadmap

- 🔄 Swap rule-based agent selection with LLM (OpenAI, LangChain)
- 🧠 Add memory/context across agent calls
- 🌍 Multi-lingual template support
- 🔌 Plugin support for live metrics or external APIs

---

## 🧑‍💻 Author

Developed by **Venkatesan Subramanian**  
Agentic AI / Capacity Automation / Full-stack Engineering
