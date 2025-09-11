export default function ConfirmDialog({ open, title = "Are you sure?", message, onCancel, onConfirm }) {
    if (!open) return null;

    return (
        <div className="modal-backdrop" onClick={onCancel}>
            <div className="modal-card small" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{title}</h3>
                </div>
                <p style={{ marginTop: 8 }}>{message}</p>
                <div className="modal-actions">
                    <button className="btn-secondary" onClick={onCancel}>Cancel</button>
                    <button className="btn-danger" onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    );
}