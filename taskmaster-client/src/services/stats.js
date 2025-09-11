import axios from "axios";

// ⚙️ Crear una instancia de Axios con base URL tomada de variables de entorno (Vite)
const statsApi = axios.create({
  baseURL: import.meta.env.VITE_STATS_BASE_URL, // Por ejemplo: "http://localhost:8001"
  headers: { Accept: "application/json" },
});

// 🔄 Función para obtener las estadísticas desde el backend
export async function fetchStats() {
  const { data } = await statsApi.get("/tasks/stats");

  // Desestructurar y asignar valores por defecto con nullish coalescing (??)
  const total =
    data.total_tasks ?? (data.pending ?? 0) + (data.in_progress ?? 0) + (data.done ?? 0);

  const completed = data.done ?? 0;
  const pending = (data.pending ?? 0) + (data.in_progress ?? 0); // Agrupamos ambos como "pendientes"

  // 📝 Crear resumen en formato de texto
  const summary = `Tasks: ${total}. Completed: ${completed}. Pending: ${pending}. Avg title length: ${data.avg_title_length ?? "n/a"}.`;

  // 🧾 Retornar objeto con todos los valores útiles
  return { total, completed, pending, summary };
}
