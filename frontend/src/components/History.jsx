import React, { useEffect, useState } from "react";
import { fetchHistory, deleteHistory } from "../utils/api";
import { formatINR } from "../utils/helpers";
import toast from "react-hot-toast";

export default function History() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  const load = async (p = 1) => {
    setLoading(true);
    try {
      const { data } = await fetchHistory(p);
      setRecords(data.data);
      setPagination(data.pagination);
    } catch {
      toast.error("Failed to load history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(page); }, [page]);

  const handleDelete = async (id) => {
    try {
      await deleteHistory(id);
      toast.success("Deleted");
      load(page);
    } catch {
      toast.error("Delete failed.");
    }
  };

  if (loading) return <div className="loading-state">Loading history…</div>;
  if (!records.length) return <div className="empty-state">No predictions yet. Make your first one!</div>;

  return (
    <div className="history-section">
      <h2 className="section-title">Recent Predictions</h2>
      <div className="history-table-wrap">
        <table className="history-table">
          <thead>
            <tr>
              <th>Location</th>
              <th>Area</th>
              <th>BHK</th>
              <th>Predicted Price</th>
              <th>Confidence</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r._id}>
                <td>{r.location}</td>
                <td>{r.area.toLocaleString()} sqft</td>
                <td>{r.bedrooms} BHK</td>
                <td className="price-cell">{formatINR(r.predictedPrice)}</td>
                <td>
                  <span className={`conf-chip conf-${r.confidence?.toLowerCase()}`}>
                    {r.confidence}
                  </span>
                </td>
                <td>{new Date(r.createdAt).toLocaleDateString("en-IN")}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(r._id)}
                    title="Delete"
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination.pages > 1 && (
        <div className="pagination">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>← Prev</button>
          <span>Page {page} of {pagination.pages}</span>
          <button disabled={page === pagination.pages} onClick={() => setPage(page + 1)}>Next →</button>
        </div>
      )}
    </div>
  );
}