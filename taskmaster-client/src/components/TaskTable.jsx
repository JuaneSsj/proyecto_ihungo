function StatusPill({ status }) {
const s = String(status || "").toLowerCase().replace("_", " ").trim();
let color = "orange"; // Pending
let label = status;

if (s.startsWith("comp")) { color = "green"; label = "Completed"; }
else if (s.startsWith("in progress")) { color = "blue"; label = "In Progress"; }
else { color = "orange"; label = "Pending"; }

return <span className={"pill " + color}>{label}</span>;

}

export default function TaskTable({ tasks = [], onEdit, onDelete }) {
    return (
        <div className="card">
            <table className="table">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Description</th>
                        <th style={{ width: 120 }}>Status</th>
                        <th style={{ width: 150 }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.length === 0 ? (
                        <tr>
                            <td colSpan="4" style={{ textAlign: "center", padding: 24 }}>
                                No tasks yet.
                            </td>
                        </tr>
                    ) : (
                        tasks.map((t) => (
                            <tr key={t.id}>
                                <td>{t.name}</td>
                                <td className="muted">{t.description}</td>
                                <td><StatusPill status={t.status} /></td>
                                <td>
                                    <button className="btn-link" onClick={() => onEdit(t)}>Edit</button>
                                    <button className="btn-link danger" onClick={() => onDelete(t)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
