const API_URL = "http://127.0.0.1:8000";
const TASKS = "/tasks/"; // Ajusta según tu endpoint

// Función base para hacer fetch
async function http(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} - ${msg}`);
  }

  return res.status === 204 ? null : res.json();
}

// Listar todas las tareas
export async function listTasks() {
  try {
    const data = await http(TASKS);
    return Array.isArray(data) ? data : (data.results ?? []);
  } catch (err) {
    console.error("Error loading tasks:", err);
    return [];
  }
}

// Crear una tarea nueva
export async function createTask(payload) {
  try {
    return await http(TASKS, { method: "POST", body: JSON.stringify(payload) });
  } catch (err) {
    console.error("Error creating task:", err);
    throw err;
  }
}

// Actualizar tarea por id
export async function updateTask(id, payload) {
  try {
    return await http(`${TASKS}${id}/`, { method: "PUT", body: JSON.stringify(payload) });
  } catch (err) {
    console.error(`Error updating task ${id}:`, err);
    throw err;
  }
}

// Eliminar tarea por id
export async function deleteTask(id) {
  try {
    return await http(`${TASKS}${id}/`, { method: "DELETE" });
  } catch (err) {
    console.error(`Error deleting task ${id}:`, err);
    throw err;
  }
}

// Obtener estadísticas del proyecto
export async function fetchStats() {
  try {
    return await http("/stats");
  } catch (err) {
    console.error("Error fetching stats:", err);
    return { total: 0, completed: 0, pending: 0, summary: "Could not fetch stats." };
  }
}
