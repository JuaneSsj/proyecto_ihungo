import { useEffect, useState } from "react";
import { fetchStats } from "../services/stats";

export default function MetricsPanel({ reloadKey }) {
    const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, summary: "" });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        (async () => {
            setLoading(true);
            try {
                const s = await fetchStats();
                if (mounted) setStats(s);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, [reloadKey]);

    return (
        <div className="card">
            <h3>Project Metrics</h3>
            <p className="muted">An AI-powered summary of your project.</p>
            <div className="metrics">
                <div><div className="metric-value">{stats.total}</div><div className="metric-label">Total</div></div>
                <div><div className="metric-value">{stats.completed}</div><div className="metric-label">Completed</div></div>
                <div><div className="metric-value">{stats.pending}</div><div className="metric-label">Pending</div></div>
            </div>
            <div className="ai-summary">
                {loading ? "Loading summary..." : (stats.summary || "Could not generate a project summary at this time. Please try again later.")}
            </div>
        </div>
    );
}