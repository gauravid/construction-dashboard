import React, { useState } from 'react';
import axios from 'axios';

const AddTool = () => {
  const [form, setForm] = useState({
    name: '',
    toolId: '',
    assignedTo: '',
    status: '',
    usageHours: '',
    lastServiced: '',
    location: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/tools', form)
      .then(() => {
        alert("✅ Tool added successfully!");
        setForm({
          name: '',
          toolId: '',
          assignedTo: '',
          status: '',
          usageHours: '',
          lastServiced: '',
          location: ''
        });
      })
      .catch(() => alert("❌ Error adding tool"));
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000',
      padding: '40px',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {/* Decorative blobs for aesthetic */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        background: '#81ecec',
        borderRadius: '50%',
        top: '-80px',
        left: '-80px',
        opacity: 0.2,
        filter: 'blur(50px)'
      }} />
      <div style={{
        position: 'absolute',
        width: '250px',
        height: '250px',
        background: '#a29bfe',
        borderRadius: '50%',
        bottom: '-70px',
        right: '-70px',
        opacity: 0.2,
        filter: 'blur(50px)'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <h2 className="fw-bold mb-4" style={{ color: 'white', fontSize: '2rem', alignSelf: 'flex-start' }}>➕ Add New Tool</h2>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold" style={{ color: '#ffffff' }}>Tool Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold" style={{ color: '#ffffff' }}>Tool ID</label>
              <input
                type="text"
                className="form-control"
                name="toolId"
                value={form.toolId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold" style={{ color: '#ffffff' }} >Assigned To</label>
              <input
                type="text"
                className="form-control"
                name="assignedTo"
                value={form.assignedTo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold" style={{ color: '#ffffff' }}>Status</label>
              <select
                className="form-select"
                name="status"
                value={form.status}
                onChange={handleChange}
                required
              >
                <option value="" >-- Select Status --</option>
                <option value="Available">Available</option>
                <option value="In Use">In Use</option>
                <option value="Damaged">Damaged</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold" style={{ color: '#ffffff' }}>Usage Hours</label>
              <input
                type="number"
                className="form-control"
                name="usageHours"
                value={form.usageHours}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label fw-semibold" style={{ color: '#ffffff' }}>Last Serviced</label>
              <input
                type="date"
                className="form-control"
                name="lastServiced"
                value={form.lastServiced}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label fw-semibold" style={{ color: '#ffffff' }}>Location</label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={form.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12 d-grid mt-3">
              <button
              type="submit"
              style={{
                backgroundColor: '#FFD700', // golden color
                color: 'black',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Submit
            </button>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTool;
