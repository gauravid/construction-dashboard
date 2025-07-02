import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const ToolList = () => {
  const [tools, setTools] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortByDate, setSortByDate] = useState(false);

  const fetchTools = () => {
    axios.get('http://localhost:5000/api/tools')
      .then(res => setTools(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchTools();
  }, []);

  const filteredTools = tools
    .filter(tool => statusFilter === 'All' || tool.status === statusFilter)
    .sort((a, b) => {
      if (!sortByDate) return 0;
      return new Date(a.lastServiced) - new Date(b.lastServiced);
    });

  const deleteTool = (id) => {
    axios.delete(`http://localhost:5000/api/tools/${id}`)
      .then(() => fetchTools())
      .catch(() => alert('❌ Error deleting tool'));
  };

  const incrementUsage = (tool) => {
    const updated = { ...tool, usageHours: tool.usageHours + 5 };
    axios.put(`http://localhost:5000/api/tools/${tool._id}`, updated)
      .then(() => fetchTools())
      .catch(() => alert('❌ Error updating tool'));
  };

  const needsMaintenance = (tool) => {
    const last = moment(tool.lastServiced);
    const daysSince = moment().diff(last, 'days');
    return tool.usageHours >= 50 || daysSince >= 30;
  };

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', padding: '30px', color: 'white' }}>
      <h2 style={{ fontWeight: '600', marginBottom: '25px', color: 'white' }}>
        🧾 Tool List
      </h2>

      <div className="row mb-3">
        <div className="col-md-4">
          <select className="form-select" style={{ backgroundColor: '#222', color: 'white' }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="Available">Available</option>
            <option value="In Use">In Use</option>
            <option value="Damaged">Damaged</option>
          </select>
        </div>
        <div className="col-md-4">
          <button className="btn btn-outline-light" onClick={() => setSortByDate(!sortByDate)}>
            {sortByDate ? 'Unsort' : 'Sort by Last Serviced'}
          </button>
        </div>
      </div>

      <table className="table table-hover table-bordered text-center" style={{ backgroundColor: 'white', color: 'black' }}>
  <thead className="table-light">
  <tr>
    <th style={{ fontSize: '1.5rem' }}>Name</th>
    <th style={{ fontSize: '1.5rem' }}>Status</th>
    <th style={{ fontSize: '1.5rem' }}>Usage (hrs)</th>
    <th style={{ fontSize: '1.5rem' }}>Last Serviced</th>
    <th style={{ fontSize: '1.5rem' }}>Location</th>
    <th style={{ fontSize: '1.5rem' }}>Actions</th>
  </tr>
</thead>

  <tbody>
    {filteredTools.map(tool => (
      <tr key={tool._id} style={{ backgroundColor: needsMaintenance(tool) ? '#ffe6e6' : 'white' }}>
        <td>{tool.name}</td>
        <td>{tool.status}</td>
        <td>{tool.usageHours}</td>
        <td>{tool.lastServiced?.substring(0, 10)}</td>
        <td>{tool.location}</td>
        <td>
          <button
            className="btn btn-sm me-2"
            style={{ backgroundColor: 'gold', color: 'black', border: 'none' }}
            onClick={() => incrementUsage(tool)}
          >
            +5 hrs
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => deleteTool(tool._id)}>
            Delete
          </button>
          {needsMaintenance(tool) && (
            <div className="text-danger small mt-1">
              ⚠️ Needs Maintenance
            </div>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default ToolList;
