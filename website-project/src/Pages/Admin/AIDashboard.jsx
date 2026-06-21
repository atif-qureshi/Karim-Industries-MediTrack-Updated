import React, { useEffect, useState } from 'react';
import { apiGet, apiPost } from '../../services/api';
import './Admin.css';

const AIDashboard = ({ token }) => {
  const [stats, setStats] = useState({});
  const [health, setHealth] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchStats();
    fetchHealth();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await apiGet('/api/stats', token);
      setStats(data);
    } catch (err) {
      console.error('AI stats error:', err);
    }
  };

  const fetchHealth = async () => {
    try {
      const data = await apiGet('/api/rag/status', token);
      setHealth(data);
    } catch (err) {
      console.error('AI health error:', err);
    }
  };

  const handleRebuild = async () => {
    setLoading(true);
    setMessage('Rebuilding knowledge base...');
    try {
      const data = await apiPost('/api/rag/rebuild', {}, token);
      setMessage(data.message || 'Rebuild complete.');
      setHealth(data);
    } catch (err) {
      setMessage(err.message || 'Rebuild failed.');
      console.error('Rebuild error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-management-panel card">
      <div className="section-header">
        <div>
          <span className="eyebrow">AI Management</span>
          <h1>RAG Knowledge Base</h1>
          <p>Monitor embedded products, vector health, and update the corpus for AI product discovery.</p>
        </div>
        <div className="section-actions">
          <button className="btn secondary" onClick={handleRebuild} disabled={loading}>
            {loading ? 'Rebuilding...' : 'Rebuild Knowledge Base'}
          </button>
        </div>
      </div>

      <div className="dashboard-summary-grid">
        <div className="summary-card highlight">
          <p className="summary-label">Total Embedded Products</p>
          <strong>{health.count ?? 'Loading...'}</strong>
        </div>
        <div className="summary-card highlight">
          <p className="summary-label">Last Embedding Update</p>
          <strong>{health.lastUpdatedAt ? new Date(health.lastUpdatedAt).toLocaleString() : 'N/A'}</strong>
        </div>
        <div className="summary-card highlight">
          <p className="summary-label">RAG Status</p>
          <strong>{health.status === 'ok' ? 'Healthy' : 'Unavailable'}</strong>
        </div>
      </div>

      <div className="card">
        <h3>Embedding Health Check</h3>
        <p>{message || 'The AI product assistant uses embeddings to find the best medical products from the catalog.'}</p>
        <ul className="health-list">
          <li>Product embeddings: {health.count ?? 'Loading...'}</li>
          <li>Vector search enabled: {health.hasVectorIndex ? 'Yes' : 'No'}</li>
          <li>Search model: text-embedding-3-small</li>
        </ul>
      </div>
    </div>
  );
};

export default AIDashboard;
