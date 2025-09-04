import os
import psycopg2
from fastapi import FastAPI
from pydantic import BaseModel

def get_conn():
    return psycopg2.connect(
        dbname=os.getenv("POSTGRES_DB", "task_manager_db"),
        user=os.getenv("POSTGRES_USER", "juanes"),
        password=os.getenv("POSTGRES_PASSWORD", "12345678"),
        host=os.getenv("DB_HOST", "localhost"),  # en Docker será "db"
        port=os.getenv("DB_PORT", "5432"),
    )

app = FastAPI(title="Task Analyzer", version="1.0.0")

class Stats(BaseModel):
    total_tasks: int
    pending: int
    in_progress: int
    done: int
    avg_title_length: float

@app.get("/stats", response_model=Stats)
def get_stats():
    # Ajusta el FROM si tu tabla no se llama tasks_task
    sql = """
    SELECT
      COUNT(*) AS total_tasks,
      COUNT(*) FILTER (WHERE status = 'PENDING') AS pending,
      COUNT(*) FILTER (WHERE status = 'IN_PROGRESS') AS in_progress,
      COUNT(*) FILTER (WHERE status = 'DONE') AS done,
      AVG(LENGTH(title)) AS avg_title_length
    FROM tasks_task;
    """
    with get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(sql)
            total, pending, inprog, done, avg_len = cur.fetchone()

    return {
        "total_tasks": int(total or 0),
        "pending": int(pending or 0),
        "in_progress": int(inprog or 0),
        "done": int(done or 0),
        "avg_title_length": float(avg_len or 0.0),
    }