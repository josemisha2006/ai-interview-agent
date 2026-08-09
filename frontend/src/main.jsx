import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Code2,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";
import "./styles.css";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
const candidates = [
  {
    member: {
      id: "CAND-001",
      name: "Sarah Johnson",
      jobRole: "Senior Data Engineer",
      yearsExperience: 9,
      education: "MS Computer Science",
      status: "COMPLETED",
    },
    missions: [
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 1 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 1 },
      {
        day: 10,
        title: "Retrieval & Matching Engine",
        passed: true,
        attempts: 2,
      },
      {
        day: 12,
        title: "Prompt Engineering Fundamentals",
        passed: true,
        attempts: 4,
      },
      {
        day: 16,
        title: "Chatbot Backend & API Integration",
        passed: true,
        attempts: 1,
      },
      {
        day: 22,
        title: "Multi-Agent Orchestration",
        passed: true,
        attempts: 2,
      },
      {
        day: 23,
        title: "Model Context Protocol (MCP)",
        passed: true,
        attempts: 2,
      },
      {
        day: 28,
        title: "Docker & Kubernetes Deployment",
        passed: true,
        attempts: 3,
      },
      { day: 29, title: "Monitoring, Logging & Observability", skipped: true },
      {
        day: 31,
        title: "Capstone Project & Final Demo",
        passed: true,
        attempts: 1,
      },
    ],
    signals: { commitDays: 28, missionsCompleted: 30, missionsFirstTry: 20 },
  },
  {
    member: {
      id: "CAND-002",
      name: "Alex Turner",
      jobRole: "Backend Software Engineer",
      yearsExperience: 5,
      education: "B.Tech Computer Science",
      status: "COMPLETED",
    },
    missions: [
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 3 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 2 },
      {
        day: 10,
        title: "Retrieval & Matching Engine",
        passed: true,
        attempts: 4,
      },
      {
        day: 12,
        title: "Prompt Engineering Fundamentals",
        passed: true,
        attempts: 5,
      },
      {
        day: 13,
        title: "Function Calling & Structured Outputs",
        passed: true,
        attempts: 4,
      },
      {
        day: 16,
        title: "Chatbot Backend & API Integration",
        passed: true,
        attempts: 1,
      },
      { day: 18, title: "Streaming Responses", passed: true, attempts: 1 },
      {
        day: 22,
        title: "Multi-Agent Orchestration",
        passed: true,
        attempts: 3,
      },
      {
        day: 28,
        title: "Docker & Kubernetes Deployment",
        passed: true,
        attempts: 1,
      },
      {
        day: 31,
        title: "Capstone Project & Final Demo",
        passed: true,
        attempts: 2,
      },
    ],
    signals: { commitDays: 22, missionsCompleted: 29, missionsFirstTry: 10 },
  },
  {
    member: {
      id: "CAND-003",
      name: "Emily Chen",
      jobRole: "AI Engineer",
      yearsExperience: 6,
      education: "MS Artificial Intelligence",
      status: "COMPLETED",
    },
    missions: [
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 1 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 1 },
      {
        day: 10,
        title: "Retrieval & Matching Engine",
        passed: true,
        attempts: 1,
      },
      {
        day: 11,
        title: "RAG End-to-End & LLM API Basics",
        passed: true,
        attempts: 1,
      },
      {
        day: 12,
        title: "Prompt Engineering Fundamentals",
        passed: true,
        attempts: 1,
      },
      {
        day: 13,
        title: "Function Calling & Structured Outputs",
        passed: true,
        attempts: 1,
      },
      { day: 21, title: "LangChain Agents", passed: true, attempts: 1 },
      {
        day: 22,
        title: "Multi-Agent Orchestration",
        passed: true,
        attempts: 1,
      },
      {
        day: 23,
        title: "Model Context Protocol (MCP)",
        passed: true,
        attempts: 1,
      },
      {
        day: 31,
        title: "Capstone Project & Final Demo",
        passed: true,
        attempts: 1,
      },
    ],
    signals: { commitDays: 31, missionsCompleted: 31, missionsFirstTry: 30 },
  },
  {
    member: {
      id: "CAND-010",
      name: "Gerald Combs",
      jobRole: "IT Support Specialist",
      yearsExperience: 20,
      education: "AAS Information Technology",
      status: "COMPLETED",
    },
    missions: [
      {
        day: 1,
        title: "VS Code & Python Environment Setup",
        passed: true,
        attempts: 2,
      },
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 5 },
      {
        day: 8,
        title: "Vector Databases Overview",
        passed: false,
        attempts: 4,
      },
      {
        day: 10,
        title: "Retrieval & Matching Engine",
        passed: false,
        attempts: 3,
      },
      {
        day: 12,
        title: "Prompt Engineering Fundamentals",
        passed: true,
        attempts: 5,
      },
      {
        day: 16,
        title: "Chatbot Backend & API Integration",
        passed: true,
        attempts: 4,
      },
      {
        day: 22,
        title: "Multi-Agent Orchestration",
        passed: false,
        attempts: 3,
      },
      { day: 27, title: "Security, Privacy & Guardrails", skipped: true },
      { day: 28, title: "Docker & Kubernetes Deployment", skipped: true },
      {
        day: 31,
        title: "Capstone Project & Final Demo",
        passed: true,
        attempts: 3,
      },
    ],
    signals: { commitDays: 22, missionsCompleted: 23, missionsFirstTry: 1 },
  },
  {
    member: {
      id: "CAND-020",
      name: "Priyanka Sharma",
      jobRole: "Software Engineer",
      yearsExperience: 5,
      education: "BS Computer Science",
      status: "COMPLETED",
    },
    missions: [
      {
        day: 1,
        title: "VS Code & Python Environment Setup",
        passed: true,
        attempts: 1,
      },
      {
        day: 3,
        title: "First AI Project, React Frontend & GitHub",
        passed: true,
        attempts: 1,
      },
      { day: 4, title: "Reading & Processing Structured Data", skipped: true },
      { day: 7, title: "Embeddings Explained", passed: false, attempts: 2 },
      { day: 8, title: "Vector Databases Overview", skipped: true },
      {
        day: 12,
        title: "Prompt Engineering Fundamentals",
        passed: true,
        attempts: 1,
      },
      {
        day: 16,
        title: "Chatbot Backend & API Integration",
        passed: true,
        attempts: 1,
      },
      {
        day: 22,
        title: "Multi-Agent Orchestration",
        passed: true,
        attempts: 1,
      },
      {
        day: 27,
        title: "Security, Privacy & Guardrails",
        passed: true,
        attempts: 1,
      },
      {
        day: 31,
        title: "Capstone Project & Final Demo",
        passed: true,
        attempts: 1,
      },
    ],
    signals: { commitDays: 24, missionsCompleted: 27, missionsFirstTry: 19 },
  },
];

function App() {
  const [selected, setSelected] = useState(candidates[0]);
  const [sessionId, setSessionId] = useState(() => crypto.randomUUID());
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [done, setDone] = useState(false);

  const progress = useMemo(() => {
    const interviewerMessages = messages.filter((m) => m.role === "assistant");
    return Math.min(8, interviewerMessages.length);
  }, [messages]);

  async function start() {
    setLoading(true);
    setMessages([]);
    setFeedback(null);
    setDone(false);
    const id = crypto.randomUUID();
    setSessionId(id);
    try {
      const res = await fetch(`${API}/api/interview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: id, candidate: selected }),
      });
      const data = await res.json();
      setMessages([{ role: "assistant", content: data.reply }]);
      setStarted(true);
    } catch {
      setMessages([
        {
          role: "assistant",
          content:
            "Backend is not reachable. Start FastAPI with: uvicorn backend.main:app --reload",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function send() {
    const text = answer.trim();
    if (!text || loading || done) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setAnswer("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/interview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: text }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
      if (data.done) {
        setDone(true);
        setFeedback(data.feedback);
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "I couldn't reach the interview engine. Please check that the backend is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStarted(false);
    setDone(false);
    setFeedback(null);
    setMessages([]);
    setAnswer("");
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="logo">
            <BrainCircuit size={22} />
          </div>
          <div>
            <b>InterviewOS</b>
            <span>AI Interview Agent</span>
          </div>
        </div>
        <div className="side-title">Candidate</div>
        <div className="candidate-card">
          <div className="avatar">
            <UserRound size={20} />
          </div>
          <div>
            <strong>{selected.member.name}</strong>
            <small>{selected.member.jobRole}</small>
          </div>
        </div>
        <select
          value={selected.member.id}
          disabled={started}
          onChange={(e) =>
            setSelected(candidates.find((c) => c.member.id === e.target.value))
          }
        >
          {candidates.map((c) => (
            <option key={c.member.id} value={c.member.id}>
              {c.member.id} · {c.member.name}
            </option>
          ))}
        </select>
        <div className="stats">
          <div>
            <span>Experience</span>
            <b>{selected.member.yearsExperience} yrs</b>
          </div>
          <div>
            <span>Missions</span>
            <b>{selected.signals.missionsCompleted}</b>
          </div>
          <div>
            <span>First try</span>
            <b>{selected.signals.missionsFirstTry}</b>
          </div>
        </div>
        <div className="side-note">
          <Sparkles size={16} />
          <p>
            Questions adapt to failed, skipped, and high-attempt cohort
            missions.
          </p>
        </div>
        <div className="modules">
          <span>Coverage</span>
          <div>Embeddings</div>
          <div>RAG & Prompting</div>
          <div>Backend & Memory</div>
          <div>Agents & MCP</div>
          <div>Security & Production</div>
        </div>
      </aside>

      <main className="main">
        <header>
          <div>
            <div className="eyebrow">
              <span className="live-dot"></span> LIVE TECHNICAL INTERVIEW
            </div>
            <h1>AI Interview Agent</h1>
            <p>
              Context-aware questions based on the candidate's 31-day learning
              journey.
            </p>
          </div>
          <div className="header-pill">
            <Code2 size={16} /> 8+ questions
          </div>
        </header>

        {!started ? (
          <section className="welcome">
            <div className="hero-icon">
              <Bot size={36} />
            </div>
            <h2>Ready to interview {selected.member.name}?</h2>
            <p>
              The agent will cover at least four curriculum areas, remember
              previous answers, and probe deeper when an answer needs more
              evidence.
            </p>
            <div className="feature-grid">
              <div>
                <CheckCircle2 />
                <b>Personalized</b>
                <span>Uses mission history and attempts.</span>
              </div>
              <div>
                <CheckCircle2 />
                <b>Adaptive</b>
                <span>Follow-ups target weak explanations.</span>
              </div>
              <div>
                <CheckCircle2 />
                <b>Actionable</b>
                <span>Ends with strengths, gaps and next steps.</span>
              </div>
            </div>
            <button className="primary" onClick={start} disabled={loading}>
              {loading ? "Starting..." : "Start Interview"}{" "}
              <ChevronRight size={18} />
            </button>
          </section>
        ) : (
          <section className="workspace">
            <div className="progress">
              <div>
                <span>Interview progress</span>
                <b>
                  {done
                    ? "Complete"
                    : `${Math.min(progress, 8)} / 8 core topics`}
                </b>
              </div>
              <div className="bar">
                <i
                  style={{
                    width: `${done ? 100 : Math.min(100, (progress / 8) * 100)}%`,
                  }}
                ></i>
              </div>
            </div>
            <div className="chat">
              {messages.map((m, i) => (
                <div key={i} className={`bubble-row ${m.role}`}>
                  <div className="mini">
                    {m.role === "assistant" ? (
                      <Bot size={15} />
                    ) : (
                      <UserRound size={15} />
                    )}
                  </div>
                  <div className="bubble">{m.content}</div>
                </div>
              ))}
              {loading && (
                <div className="bubble-row assistant">
                  <div className="mini">
                    <Bot size={15} />
                  </div>
                  <div className="bubble typing">
                    <i></i>
                    <i></i>
                    <i></i>
                  </div>
                </div>
              )}
              {feedback && (
                <div className="feedback">
                  <div className="feedback-head">
                    <CheckCircle2 />
                    <div>
                      <h3>Interview complete</h3>
                      <p>{feedback.summary}</p>
                    </div>
                  </div>
                  <div className="feedback-grid">
                    <div>
                      <h4>Strengths</h4>
                      {feedback.strengths.map((x, i) => (
                        <p key={i}>✓ {x}</p>
                      ))}
                    </div>
                    <div>
                      <h4>Gaps</h4>
                      {feedback.gaps.map((x, i) => (
                        <p key={i}>• {x}</p>
                      ))}
                    </div>
                    <div>
                      <h4>Next steps</h4>
                      {feedback.next.map((x, i) => (
                        <p key={i}>→ {x}</p>
                      ))}
                    </div>
                  </div>
                  <button className="secondary" onClick={reset}>
                    Start another interview
                  </button>
                </div>
              )}
            </div>
            {!done && (
              <div className="composer">
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  placeholder="Type your technical answer… (Enter to send, Shift+Enter for a new line)"
                />
                <button onClick={send} disabled={loading || !answer.trim()}>
                  <Send size={18} />
                </button>
              </div>
            )}
          </section>
        )}
        <footer>
          Session: <code>{sessionId}</code> · No authentication required · Built
          for the Abtalks Problem Statement 2
        </footer>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
