import { useEffect, useState } from "react";
import { listTasks, createTask, updateTask, deleteTask } from "./services/api";
import TaskTable from "./components/TaskTable";
import TaskFormModal from "./components/TaskFormModal";
import ConfirmDialog from "./components/ConfirmDialog";
import MetricsPanel from "./components/MetricsPanel";
import "./styles.css";



export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openCreate, setOpenCreate] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  const [metricsReloadKey, setMetricsReloadKey] = useState(0);

  async function loadTasks() {
    setLoading(true);
    try {
      const data = await listTasks();
      setTasks(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadTasks(); }, []);

  async function handleCreate(payload) {
    await createTask(payload);
    setOpenCreate(false);
    await loadTasks();
    setMetricsReloadKey((k) => k + 1);
  }

  async function handleEdit(payload) {
    if (!editTask) return;
    await updateTask(editTask.id, payload);
    setEditTask(null);
    await loadTasks();
    setMetricsReloadKey((k) => k + 1);
  }

  async function handleDelete() {
    if (!toDelete) return;
    await deleteTask(toDelete.id);
    setToDelete(null);
    await loadTasks();
    setMetricsReloadKey((k) => k + 1);
  }

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">TaskMaster</div>
        <button className="btn-primary" onClick={() => setOpenCreate(true)}>New Task</button>
      </header>
      <main className="content">
        <h2>My Tasks</h2>
        {loading ? <div className="card">Loading...</div> :
          <TaskTable tasks={tasks} onEdit={setEditTask} onDelete={setToDelete} />
        }
        <MetricsPanel reloadKey={metricsReloadKey} />
      </main>

      <TaskFormModal open={openCreate} onClose={() => setOpenCreate(false)} onSubmit={handleCreate} />
      <TaskFormModal open={!!editTask} onClose={() => setEditTask(null)} onSubmit={handleEdit} initial={editTask} />
      <ConfirmDialog
        open={!!toDelete}
        onCancel={() => setToDelete(null)}
        onConfirm={handleDelete}
        message={`This action cannot be undone. This will permanently delete the task "${toDelete?.name}".`}
      />
    </div>
  );
}