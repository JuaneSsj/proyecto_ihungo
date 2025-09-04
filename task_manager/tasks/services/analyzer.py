import requests
from django.conf import settings


#con esto recibo los datos del micro servicio y lo retorno
class TaskAnalyzerService:
    def __init__(self, base_url=None, timeout=3.0, session=None):
        self.base_url = base_url or getattr(settings, "ANALYZER_BASE_URL", "http://localhost:8001")
        self.timeout = timeout
        self.session = session or requests.Session()

    def get_stats(self) -> dict:
        url = f"{self.base_url.rstrip('/')}/stats"
        resp = self.session.get(url, timeout=self.timeout)
        resp.raise_for_status()
        data = resp.json()
        # Validación mínima
        expected = {"total_tasks", "pending", "in_progress", "done", "avg_title_length"}
        if not expected.issubset(data):
            raise ValueError("Respuesta inesperada del analyzer")
        return data