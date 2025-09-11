import { useEffect, useState } from "react";

const STATUS_OPTIONS = ["Pending","In progress" ,"Completed"];

export default function TaskFormModal({ open, onClose, onSubmit, initial }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Pending");

    useEffect(() => {
        if (initial) {
            setName(initial.name || "");
            setDescription(initial.description || "");
            setStatus(initial.status || "Pending");
        } else {
            setName("");
            setDescription("");
            setStatus("Pending");
        }
    }, [initial, open]);

    if (!open) return null;

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit({ name, description, status });
    }

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{initial ? "Edit Task" : "Create New Task"}</h3>
                    <button className="icon-btn" onClick={onClose}>×</button>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <label>
                        Task Name
                        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Deploy to production" required />
                    </label>

                    <label>
                        Description
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the task in detail..." />
                    </label>

                    <label>
                        Status
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            {STATUS_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                    </label>

                    <div className="modal-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-primary">{initial ? "Save Changes" : "Create Task"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}