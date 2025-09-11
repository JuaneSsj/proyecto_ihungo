from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import psycopg2

# 🔌 Conexión a Postgres usando variables de entorno (las pasa docker-compose)
def get_conn():
    return psycopg2.connect(
        dbname=os.getenv("POSTGRES_DB", "task_manager_db"),
        user=os.getenv("POSTGRES_USER", "juanes"),
        password=os.getenv("POSTGRES_PASSWORD", "12345678"),
        host=os.getenv("DB_HOST", "localhost"),  # En docker-compose será "db"
        port=os.getenv("DB_PORT", "5432")        # En docker-compose 5432
    )

# 🚀 Inicializa la app FastAPI
app = FastAPI(title="Task Analyzer", version="1.0.0")

# 🌐 CORS para permitir al frontend (Vite en 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=False,
    allow_methods=["*"],   # <-- Cambiado de [""] a ["*"] para permitir todos los métodos
    allow_headers=["*"]    # <-- Igual aquí
)

# 📊 Modelo para las estadísticas
class Stats(BaseModel):
    total_tasks: int
    pending: int
    in_progress: int
    done: int
    avg_title_length: float

# 🔁 Endpoint de salud (útil para comprobar si el backend está activo)
@app.get("/health")
def health():
    return {"status": "ok"}

# 📈 Endpoint que devuelve estadísticas de las tareas
@app.get("/tasks/stats", response_model=Stats)
def get_stats():
    # UPPER(status) para tolerar mayúsculas/minúsculas en la columna status
    sql = """
    SELECT
        COUNT(*) AS total_tasks,
        COUNT(*) FILTER (WHERE UPPER(status) = 'PENDING') AS pending,
        COUNT(*) FILTER (WHERE UPPER(status) = 'IN_PROGRESS') AS in_progress,
        COUNT(*) FILTER (WHERE UPPER(status) = 'DONE' OR UPPER(status) = 'COMPLETED') AS done,
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
