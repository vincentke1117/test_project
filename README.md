# HumanEval Playground (Web Only)

This project provides a web-based interface for experimenting with the [HumanEval dataset](https://huggingface.co/datasets/openai/openai_humaneval/blob/main/README.md) of 164 Python programming problems. Each task exposes the original function signature, docstring and a reference test case set.

The system reports model performance using the *pass@k* metric, an unbiased estimate of the probability that at least one of `n` generated samples passes the official tests for each task as described in [Evaluating Large Language Models Trained on Code](https://arxiv.org/pdf/2107.03374). Multiple samples typically increase pass@k as noted in the paper.

> **Security warning**: running model-generated code is potentially dangerous. The backend executes code in a restricted sandbox with no network access, limited resources and an import whitelist, and direct execution is disabled by default. See the [human-eval repository](https://github.com/openai/human-eval) for details and background.

The playground is designed for **web UI interactions only**. Users create evaluation runs, monitor progress and inspect results through the browser without any CLI access. Developers may still use local scripts for maintenance or testing.

## Development

- `frontend/`: React + Vite app with views for configuring runs, tracking progress, summaries and comparisons.
- `backend/`: FastAPI server exposing `/api/run` endpoints with placeholder implementations.

Install frontend dependencies and start the dev server:

```bash
cd frontend
npm install
npm run dev
```

Run the backend:

```bash
uvicorn backend.main:app --reload
```

Playwright-based end-to-end tests can be added to verify the browser workflow without executing untrusted code.
