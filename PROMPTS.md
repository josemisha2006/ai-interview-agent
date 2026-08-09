
# PROMPTS.md

# AI Interview Agent — Abtalks Problem Statement 2

This document records the AI/vibe-coding prompts used during the development of this project.

## 1. Project Initialization

### Prompt
> Which problem statement are we building?
> Problem Statement 2
>
> What should the project deliver?
> Complete working application
>
> What tech stack should we use?
> No preference

### Purpose
Used to establish the project scope, requirements, and technology choices.

---

## 2. Project Development

### Prompt
> Now create the complete project using code.

### Purpose
Used to generate the initial complete implementation of the AI Interview Agent, including the frontend, backend, data files, configuration, and project structure.

---

## 3. Backend Setup

### Prompt
> I am getting Python environment and Uvicorn errors while trying to run the backend.

### Purpose
Used to troubleshoot the Python virtual environment, dependencies, FastAPI, and Uvicorn setup.

### Result
The FastAPI backend was successfully started locally using:

```bash
python -m uvicorn backend.main:app --reload
