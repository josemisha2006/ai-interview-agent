# PROMPTS.md

# AI Interview Agent — Vibe Coding Development Log

This file documents the AI-assisted development process used while building
the AI Interview Agent for Abtalks Problem Statement 2.

The project was developed iteratively. I designed the overall idea,
decided the application structure and features, implemented and tested
individual sections, and used AI assistance when I needed help with
implementation, debugging, UI improvements, and deployment.

---

## 1. Understanding the Problem Statement

### My prompt

I need to build Problem Statement 2 as a complete working application.
I want to understand what the application should contain before starting
the implementation. Help me break the problem into frontend, backend,
data, and interview-flow components.

### What I did

I first broke the problem into smaller parts instead of trying to build
everything at once.

The main areas I identified were:

- Candidate selection
- Candidate information
- Interview start screen
- Interview questions
- Adaptive follow-up questions
- Answer submission
- Interview progress
- Evaluation/feedback
- Curriculum and candidate data
- Backend API
- Frontend UI

---

# 2. Project Structure

### My prompt

I want a clean project structure for this application.

The frontend and backend should be separated and I also want separate
folders for data and testing.

Suggest a structure that will be easy to develop locally and deploy later.

### What I did

I created the project structure with separate areas for:

3. Backend Setup
My prompt

Help me create the initial FastAPI backend for the interview application.

I need API endpoints that can be connected to the React frontend.
Keep the implementation simple enough for me to understand and modify.

What I did

I worked on the backend first and tested it locally.

The backend was implemented using:

Python
FastAPI
Uvicorn
JSON data

I tested the API locally before connecting it to the frontend.

4. Candidate Data
My prompt

I need candidate data for the interview interface.

Create a simple JSON structure that stores candidate information such as
candidate ID, name, role, experience, and other information that can be
displayed in the interview dashboard.

What I did

I created and organized:

data/candidates.json

I used this data from the application instead of hard-coding every
candidate directly into the UI.

5. Curriculum Data
My prompt

I need curriculum data for the technical interview.

Help me design a JSON structure where interview topics can be organized
by topic/skill and used by the interview logic.

What I did

I created:

data/curriculum.json

The purpose was to keep interview topics separate from the frontend code
so that the interview content could be modified more easily.

6. Frontend Layout
My prompt

I want to create the main interview dashboard.

The UI should look like a modern technical interview platform rather than
a basic form.

I want a candidate section on the left, the main interview area in the
center, and useful interview information visible without making the screen
too crowded.

What I did

I built the main React interface and adjusted the layout based on how I
wanted the application to look.

The main interface contains:

Candidate information
Candidate selector
Experience information
Interview coverage
Main interview area
Interview status
Start Interview button
7. Candidate Selection Section
My prompt

The candidate selector should be connected to the candidate data.

When I select another candidate, the information shown in the interface
should update instead of using fixed values.

Help me implement this section in React.

What I did

I connected the UI to the candidate data and implemented the candidate
selection behavior.

I tested different candidate selections and corrected the UI when values
were not updating properly.

8. Interview Start Section
My prompt

I want the Start Interview section to clearly communicate which candidate
is about to be interviewed.

Create a clean state for:

"Ready to interview [candidate name]?"

There should be a clear Start Interview action.

What I did

I implemented the initial interview state and connected the button to the
interview flow.

I tested the transition from the ready state into the interview state.

9. Interview Question Section
My prompt

Now I want to implement the actual interview question area.

The application should display one question at a time and allow the user
to provide an answer.

Keep the UI focused on the current question and make the interview
progress easy to understand.

What I did

I implemented the question area and connected it to the interview state.

I tested:

Question display
Answer input
Submit action
Moving to the next question
Interview progress
10. Adaptive Interview Logic
My prompt

The interview should not feel like a fixed questionnaire.

Help me design the logic so that the next question can depend on the
candidate's previous answer and the topic being evaluated.

I want to keep the implementation understandable rather than using an
overly complicated ML system.

What I did

I worked on the interview flow so that questions and follow-up behavior
could be handled through the backend and curriculum data.

The goal was to make the interview feel adaptive rather than simply
displaying a fixed list of questions.

11. API Connection
My prompt

The frontend is working locally and the FastAPI backend is also running.

Help me connect the React frontend to the backend without putting API
logic directly into every component.

What I did

I connected the frontend to the backend API and tested the requests
locally.

During development I used:

http://127.0.0.1:8000

for the local backend.

12. UI Improvements
My prompt

The functionality is working, but the interface needs to look more
professional.

Improve the visual hierarchy without changing the functionality.

Keep the dashboard style modern and suitable for a technical interview
platform.

What I did

I iterated on the CSS and UI layout.

I adjusted:

Spacing
Typography
Cards
Buttons
Panels
Interview status
Responsive layout

I checked the result in the browser and made further changes where
necessary.

13. Local Testing
My prompt

Help me troubleshoot the application when the frontend/backend is not
working correctly.

I will provide the terminal error or browser behavior and I want to
understand what is causing it before changing the code.

What I did

I tested the application locally and fixed issues involving:

Python environment
Uvicorn
Backend dependencies
Frontend/backend communication
Generated files
Deployment configuration
14. GitHub Setup
My prompt

I want to publish the project as a public GitHub repository.

Help me initialize Git, create the correct .gitignore, remove generated
files from tracking, and push the project to GitHub.

What I did

I created the public repository and pushed the project to:

https://github.com/josemisha2006/ai-interview-agent

I also removed generated files such as:

Python cache files
node_modules
local development files

from the repository.

15. Vercel Deployment
My prompt

I need a real publicly accessible frontend for the Abtalks submission.

The project uses Vite and the frontend is inside the frontend directory.

Help me deploy only the frontend to Vercel.

What I did

I deployed the frontend to Vercel.

The Vercel deployment initially returned a 404 because the project root
was incorrect.

I identified that the React application was inside:

frontend/

and changed the Vercel Root Directory to:

frontend

The frontend then deployed successfully.

16. FastAPI Deployment
My prompt

The frontend is live on Vercel, but the FastAPI backend is still local.

Help me deploy the backend so that the production frontend can communicate
with it.

What I did

I deployed the FastAPI backend to Render.

The backend is now publicly accessible and runs using Uvicorn.

17. Deployment Debugging
Problem

The first Render deployment failed while installing dependencies.

The logs showed an issue involving:

pydantic-core
metadata-generation-failed
My prompt

The Render deployment is failing while installing pydantic-core.
The application works locally with Python 3.13.

Help me identify the compatibility problem and configure the deployment
environment correctly.

What I did

I checked the deployment logs and identified the Python version mismatch.

I configured the Render environment to use Python 3.13, after which the
backend deployment succeeded.

18. Connecting Production Frontend and Backend
My prompt

The React frontend is deployed on Vercel and the FastAPI backend is
deployed separately.

I don't want the production frontend to call localhost.

Help me configure the API URL using a Vite environment variable so that
the same code can work locally and in production.

What I did

I changed the frontend API configuration to use:

VITE_API_URL

with a local fallback for development.

The production deployment uses the public FastAPI backend URL.

19. Final Testing
My prompt

The frontend and backend are now deployed.

Give me a checklist to test the complete application from the public URL.

What I did

I tested the production application and checked:

Application loads
Candidate information appears
Candidate selection works
Interview can be started
Questions appear
Answers can be submitted
Backend requests are reachable
Production frontend can communicate with the backend
Development Approach

The project was not created from a single AI prompt.

I used an iterative vibe-coding workflow:

Problem
   ↓
Break into feature
   ↓
Ask AI for implementation help
   ↓
Write/modify code
   ↓
Run locally
   ↓
Find problem
   ↓
Ask AI for debugging help
   ↓
Modify code
   ↓
Test again
   ↓
Move to next feature

AI was primarily used as a coding assistant for:

Implementation suggestions
React components
FastAPI endpoints
CSS improvements
Debugging
Error explanation
Deployment configuration
Git troubleshooting

I made the overall feature decisions, tested the application, reviewed
the generated code, modified the implementation, and decided what was
included in the final project.

Final Project
GitHub

https://github.com/josemisha2006/ai-interview-agent

Live Demo

https://ai-interview-agent-tan.vercel.app

Frontend

React + Vite

Backend

Python + FastAPI

Deployment

Vercel + Render
