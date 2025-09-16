// Example in App.js

import React, { useState } from 'react';

function App() {
  const [form, setForm] = useState({
    type: '',
    description: '',
    latitude: '',
    longitude: '',
    photo: null
  });
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setForm({ ...form, photo: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append('type', form.type);
    data.append('description', form.description);
    data.append('latitude', form.latitude);
    data.append('longitude', form.longitude);
    if (form.photo) data.append('photo', form.photo);

    try {
      const res = await fetch('http://localhost:3000/api/report', {
        method: 'POST',
        body: data
      });
      const result = await res.json();
      setMessage(result.message || 'Report submitted!');
    } catch {
      setMessage('Error submitting report');
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Report Pollution</h2>
      <form onSubmit={handleSubmit}>
        <label>Type:</label>
        <select name="type" value={form.type} onChange={handleChange} required style={{ width: '100%', marginBottom: 10 }}>
          <option value="">Select type</option>
          <option value="air">Air</option>
          <option value="water">Water</option>
          <option value="noise">Noise</option>
          <option value="garbage">Garbage</option>
          <option value="traffic">Traffic</option>
          <option value="industrial">Industrial</option>
          <option value="other">Other</option>
        </select>
        <label>Description:</label>
        <textarea name="description" value={form.description} onChange={handleChange} required style={{ width: '100%', marginBottom: 10 }} />
        <label>Latitude:</label>
        <input type="text" name="latitude" value={form.latitude} onChange={handleChange} required style={{ width: '100%', marginBottom: 10 }} />
        <label>Longitude:</label>
        <input type="text" name="longitude" value={form.longitude} onChange={handleChange} required style={{ width: '100%', marginBottom: 10 }} />
        <label>Photo:</label>
        <input type="file" name="photo" accept="image/*" onChange={handleChange} style={{ width: '100%', marginBottom: 10 }} />
        {preview && <img src={preview} alt="Preview" style={{ width: '100%', marginBottom: 10 }} />}
        <button type="submit" style={{ width: '100%', padding: 10, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>Submit Report</button>
      </form>
      {message && <p style={{ marginTop: 20 }}>{message}</p>}
    </div>
  );
}

export default App;