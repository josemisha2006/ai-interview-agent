
from __future__ import annotations

import json
import os
import re
from pathlib import Path
from typing import Any, Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

BASE = Path(__file__).resolve().parent.parent
DATA = BASE / "data"

app = FastAPI(
    title="AI Interview Agent",
    description="Adaptive technical interview agent for the 31-day AI Cohort.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["POST", "OPTIONS"],
    allow_headers=["*"],
)

SESSIONS: dict[str, dict[str, Any]] = {}

with open(DATA / "curriculum.json", "r", encoding="utf-8") as f:
    CURRICULUM = json.load(f)

DAY_BY_ID = {d["day"]: d for d in CURRICULUM["days"]}

# Eight core questions deliberately span five curriculum modules.
QUESTION_BANK = [
    {
        "id": "q1",
        "day": 7,
        "module": "Embeddings & Vector Search",
        "skill": "embeddings",
        "question": "Explain what an embedding is and why embeddings are useful in an AI application.",
        "keywords": ["vector", "semantic", "similarity", "text"],
        "follow_up": "Suppose two sentences use different words but mean the same thing. How would embeddings help a retrieval system recognize that?",
    },
    {
        "id": "q2",
        "day": 10,
        "module": "Embeddings & Vector Search",
        "skill": "retrieval",
        "question": "Design a retrieval pipeline for a question-answering system. Walk me through the important stages.",
        "keywords": ["query", "embedding", "vector", "retrieve", "rank"],
        "follow_up": "If the retrieved documents are relevant but the answer is still wrong, what would you inspect first?",
    },
    {
        "id": "q3",
        "day": 12,
        "module": "LLM Core, Prompting & Fine-Tuning",
        "skill": "prompting",
        "question": "How would you design a production prompt for an LLM that must answer using only trusted context?",
        "keywords": ["context", "instruction", "grounded", "constraint", "prompt"],
        "follow_up": "How would you test whether that prompt is actually improving accuracy rather than just changing the wording?",
    },
    {
        "id": "q4",
        "day": 16,
        "module": "Chatbot Application Build",
        "skill": "backend",
        "question": "How would you structure a backend API for a conversational AI application?",
        "keywords": ["api", "session", "endpoint", "database", "history"],
        "follow_up": "What would you store for each session, and how would you prevent one user's conversation from leaking into another?",
    },
    {
        "id": "q5",
        "day": 20,
        "module": "Chatbot Application Build",
        "skill": "memory",
        "question": "Explain how conversation memory should work when a chat becomes too long for the model context window.",
        "keywords": ["history", "summary", "token", "context", "memory"],
        "follow_up": "What information would you preserve during summarization, and what information could safely be dropped?",
    },
    {
        "id": "q6",
        "day": 22,
        "module": "Agentic AI & MCP",
        "skill": "agents",
        "question": "What is the advantage of using multiple specialized agents instead of one general-purpose agent?",
        "keywords": ["agent", "router", "specialist", "tool", "task"],
        "follow_up": "Give me a concrete routing example and explain how you would handle a request that matches two specialists.",
    },
    {
        "id": "q7",
        "day": 27,
        "module": "Evaluation, Security & Deployment",
        "skill": "security",
        "question": "What security risks should you consider when exposing an LLM application to users?",
        "keywords": ["prompt injection", "validation", "privacy", "input", "guardrail"],
        "follow_up": "A user tries to override the system instructions through their prompt. Describe the controls you would put around the model.",
    },
    {
        "id": "q8",
        "day": 31,
        "module": "Production & Capstone",
        "skill": "architecture",
        "question": "You are taking an AI prototype into production. Describe the architecture and the most important reliability checks you would add.",
        "keywords": ["monitoring", "logging", "deployment", "testing", "latency"],
        "follow_up": "If latency suddenly doubled after deployment, how would you investigate the problem?",
    },
]

class Member(BaseModel):
    id: str
    name: str
    jobRole: str
    yearsExperience: int
    education: str
    status: str

class Mission(BaseModel):
    day: int
    title: str
    passed: Optional[bool] = None
    skipped: Optional[bool] = None
    attempts: Optional[int] = None

class Candidate(BaseModel):
    member: Member
    missions: list[Mission] = Field(default_factory=list)
    signals: dict[str, Any] = Field(default_factory=dict)

class InterviewRequest(BaseModel):
    sessionId: str
    candidate: Optional[Candidate] = None
    message: Optional[str] = None

def norm(s: str) -> str:
    return re.sub(r"[^a-z0-9\s]", " ", s.lower())

def mission_map(candidate: Candidate) -> dict[int, Mission]:
    return {m.day: m for m in candidate.missions}

def choose_question(candidate: Candidate, asked: list[str]) -> dict[str, Any]:
    m = mission_map(candidate)

    def score(q: dict[str, Any]) -> tuple[int, int]:
        mission = m.get(q["day"])
        # Prioritize demonstrated weakness, then high-attempt missions.
        weakness = 0
        if mission:
            if mission.passed is False or mission.skipped is True:
                weakness += 8
            if mission.attempts and mission.attempts >= 4:
                weakness += 4
        return (weakness, -len(asked))

    remaining = [q for q in QUESTION_BANK if q["id"] not in asked]
    if not remaining:
        return QUESTION_BANK[-1]
    return max(remaining, key=score)

def evaluate_answer(answer: str, q: dict[str, Any]) -> dict[str, Any]:
    text = norm(answer)
    words = set(text.split())
    hits = [k for k in q["keywords"] if all(part in words for part in norm(k).split())]
    word_count = len(words)

    if word_count < 8:
        level = "weak"
    elif len(hits) >= max(2, len(q["keywords"]) // 2):
        level = "strong"
    else:
        level = "developing"

    return {
        "level": level,
        "keyword_hits": hits,
        "word_count": word_count,
        "needs_followup": level != "strong" and word_count >= 8,
    }

def feedback(session: dict[str, Any]) -> dict[str, Any]:
    answers = session["answers"]
    strong = sum(a["evaluation"]["level"] == "strong" for a in answers)
    developing = sum(a["evaluation"]["level"] == "developing" for a in answers)
    weak = sum(a["evaluation"]["level"] == "weak" for a in answers)
    total = len(answers)

    strengths = []
    gaps = []
    next_steps = []

    if strong >= 4:
        strengths.append("Explains several AI concepts with relevant technical vocabulary.")
    if any(a["evaluation"]["keyword_hits"] for a in answers):
        strengths.append("Connects theory to implementation concerns such as retrieval, APIs, memory, and deployment.")
    if session["followups"] >= 2:
        strengths.append("Responds to probing questions and maintains context across multiple turns.")

    if weak:
        gaps.append("Some answers were too brief to demonstrate implementation-level understanding.")
    if developing >= 2:
        gaps.append("Several topics need more precise explanation of components, trade-offs, and failure modes.")
    if not any("security" == a["question"]["skill"] for a in answers):
        gaps.append("Security and guardrail reasoning was not sufficiently demonstrated.")

    next_steps.append("Practice explaining each architecture decision with one concrete example.")
    next_steps.append("For weak areas, use a structure of problem → design → trade-off → failure handling.")
    next_steps.append("Revisit the cohort missions with high attempt counts or failed/skipped status.")

    if total:
        pct = round((strong / total) * 100)
    else:
        pct = 0

    return {
        "summary": f"Completed {total} interview topics with an estimated {pct}% strong-answer rate. "
                   f"The interview showed {strong} strong, {developing} developing, and {weak} weak responses.",
        "strengths": strengths[:4] or ["Shows willingness to reason through technical questions."],
        "gaps": gaps[:4] or ["No major recurring gap was detected by the lightweight evaluator."],
        "next": next_steps[:4],
    }

def build_opening(candidate: Candidate) -> str:
    return (
        f"Welcome, {candidate.member.name}. I'll run a technical interview tailored to your "
        f"{candidate.member.jobRole} profile and your 31-day AI Cohort progress. "
        "I'll ask at least eight questions, use follow-ups when an answer needs deeper evidence, "
        "and finish with actionable feedback.\n\n"
        f"Question 1: {QUESTION_BANK[0]['question']}"
    )

def process_turn(session: dict[str, Any], message: str) -> tuple[str, bool, Optional[dict[str, Any]]]:
    current = session["current_question"]
    evaluation = evaluate_answer(message, current)

    session["answers"].append({
        "question": current,
        "answer": message,
        "evaluation": evaluation,
    })

    # Ask a targeted follow-up without consuming a new core topic.
    if evaluation["needs_followup"] and session["followup_used_for"] != current["id"]:
        session["followup_used_for"] = current["id"]
        session["followups"] += 1
        return (
            f"Good start. I'd like to probe that further: {current['follow_up']}",
            False,
            None,
        )

    session["followup_used_for"] = None
    asked = [a["question"]["id"] for a in session["answers"]]
    if len(set(asked)) >= 8:
        session["done"] = True
        fb = feedback(session)
        return "Interview completed. Here is your actionable feedback.", True, fb

    nxt = choose_question(session["candidate"], asked)
    session["current_question"] = nxt
    number = len(set(asked)) + 1
    return f"Thanks. Let's move on.\n\nQuestion {number}: {nxt['question']}", False, None

@app.post("/api/interview")
def interview(req: InterviewRequest):
    if req.sessionId not in SESSIONS:
        if req.candidate is None:
            # Contract requires candidate on the first request.
            return {
                "reply": "This is a new session. Please send the candidate object with the first request.",
                "done": False,
            }

        session = {
            "candidate": req.candidate,
            "current_question": QUESTION_BANK[0],
            "answers": [],
            "followups": 0,
            "followup_used_for": None,
            "done": False,
        }
        SESSIONS[req.sessionId] = session
        return {"reply": build_opening(req.candidate), "done": False}

    session = SESSIONS[req.sessionId]
    if session["done"]:
        return {"reply": "This interview is already complete.", "done": True, "feedback": feedback(session)}

    message = (req.message or "").strip()
    if not message:
        return {"reply": "Please provide your answer to the current interview question.", "done": False}

    reply, done, fb = process_turn(session, message)
    response = {"reply": reply, "done": done}
    if fb is not None:
        response["feedback"] = fb
    return response
