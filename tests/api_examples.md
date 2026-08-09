# Manual API smoke test

Start the backend:

```bash
uvicorn backend.main:app --reload
```

Then:

```bash
curl -X POST http://127.0.0.1:8000/api/interview ^
  -H "Content-Type: application/json" ^
  -d "{\"sessionId\":\"demo-001\",\"candidate\":{\"member\":{\"id\":\"CAND-001\",\"name\":\"Sarah Johnson\",\"jobRole\":\"Senior Data Engineer\",\"yearsExperience\":9,\"education\":\"MS Computer Science\",\"status\":\"COMPLETED\"},\"missions\":[],\"signals\":{}}}"
```

Then continue the same session:

```bash
curl -X POST http://127.0.0.1:8000/api/interview ^
  -H "Content-Type: application/json" ^
  -d "{\"sessionId\":\"demo-001\",\"message\":\"An embedding is a vector representation of semantic meaning. Similar text should have nearby vectors.\"}"
```

Repeat until `done` becomes `true`.
