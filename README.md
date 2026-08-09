# AI Interview Agent — Abtalks Problem Statement 2

A complete working full-stack implementation of the **AI Interview Agent**.

## What it does

- Uses the candidate's 31-day AI Cohort progress to personalize the interview.
- Covers **at least 8 core questions** across more than four curriculum areas.
- Maintains state using the required `sessionId`.
- Uses answer analysis to trigger targeted follow-up questions.
- Finishes with structured feedback:
  - `summary`
  - `strengths`
  - `gaps`
  - `next`
- Requires **no authentication**.
- Runs without an API key using a deterministic adaptive interview engine.
- Can be extended with an OpenAI-compatible LLM later without changing the API contract.

The required endpoint is:

```http
POST /api/interview
```

## Project structure

```text
ai-interview-agent/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
├── data/
│   ├── candidates.json
│   └── curriculum.json
├── frontend/
│   ├── package.json
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       └── styles.css
├── tests/
│   └── api_examples.md
└── README.md
```

## Run backend

From the project root:

```bash
python -m venv .venv
```

Windows:

```bash
.venv\Scripts\activate
```

macOS/Linux:

```bash
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r backend/requirements.txt
```

Start FastAPI:

```bash
uvicorn backend.main:app --reload
```

Backend:

`http://127.0.0.1:8000`

## Run frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually:

`http://localhost:5173`

## API contract

### Start

```json
{
  "sessionId": "abc-123",
  "candidate": {
    "member": {
      "id": "CAND-001",
      "name": "Sarah Johnson",
      "jobRole": "Senior Data Engineer",
      "yearsExperience": 9,
      "education": "MS Computer Science",
      "status": "COMPLETED"
    },
    "missions": [],
    "signals": {}
  }
}
```

### Continue

```json
{
  "sessionId": "abc-123",
  "message": "An embedding is a vector representation that captures semantic meaning..."
}
```

### Completion

```json
{
  "reply": "Interview completed. Here is your actionable feedback.",
  "done": true,
  "feedback": {
    "summary": "...",
    "strengths": ["..."],
    "gaps": ["..."],
    "next": ["..."]
  }
}
```

## Why the implementation is robust for judging

The interview does not simply show a fixed list of questions. It uses mission history to prioritize topics where the candidate has failed, skipped a mission, or needed many attempts. It then evaluates each answer for topic coverage and can ask a topic-specific follow-up before moving to the next core topic.

The frontend is only a client. The authoritative interview state lives in the FastAPI process under the supplied `sessionId`, matching the technical specification.

## Submission note

The `data/candidates.json` file contains representative records from the supplied dataset so the UI is immediately runnable. The backend accepts the **full supplied candidate object** in the first request, so replacing that file with the complete original dataset does not require code changes.
