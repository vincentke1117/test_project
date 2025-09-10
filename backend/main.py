from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any
from uuid import uuid4

app = FastAPI(title="HumanEval Playground API")

# In-memory store for demo purposes
RUNS: Dict[str, Dict[str, Any]] = {}

class RunRequest(BaseModel):
    tasks: List[int] | str = "all"
    n: int
    ks: List[int]
    model: str
    params: Dict[str, Any] = {}
    seed: int | None = None

class RunResponse(BaseModel):
    run_id: str

@app.post("/api/run", response_model=RunResponse)
def start_run(req: RunRequest):
    run_id = str(uuid4())
    RUNS[run_id] = {"status": "pending", "request": req.dict()}
    return {"run_id": run_id}

@app.get("/api/run/{run_id}/status")
def run_status(run_id: str):
    run = RUNS.get(run_id)
    if not run:
        return {"error": "run not found"}
    return {"status": run["status"], "completed": 0, "total": 0, "eta": None}

@app.get("/api/run/{run_id}/summary")
def run_summary(run_id: str):
    if run_id not in RUNS:
        return {"error": "run not found"}
    return {
        "pass@k": {},
        "n": RUNS[run_id]["request"].get("n", 0),
        "ks": RUNS[run_id]["request"].get("ks", []),
        "model": RUNS[run_id]["request"].get("model"),
        "params": RUNS[run_id]["request"].get("params", {}),
    }

@app.get("/api/run/{run_id}/task/{task_id}")
def task_detail(run_id: str, task_id: int):
    if run_id not in RUNS:
        return {"error": "run not found"}
    return {
        "task_id": task_id,
        "samples": [],
    }

@app.post("/api/run/{run_id}/task/{task_id}/rerun")
def task_rerun(run_id: str, task_id: int):
    if run_id not in RUNS:
        return {"error": "run not found"}
    return {"status": "scheduled"}
