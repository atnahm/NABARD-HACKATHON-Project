import { useState } from 'react'
import axios from 'axios'

export default function UploadData() {
  const [form, setForm] = useState({
    farmer_name: '',
    farm_size: '',
    crop_type: '',
    tree_count: '',
  })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Submitting...')
    try {
      const payload = {
        farmer_name: form.farmer_name,
        farm_size: parseFloat(form.farm_size || 0),
        crop_type: form.crop_type,
        tree_count: parseInt(form.tree_count || 0, 10),
      }
      const res = await axios.post('http://127.0.0.1:8000/upload_data', payload)
      setStatus(`Success! Saved with id ${res.data.id}`)
    } catch (err) {
      setStatus('Failed to upload data')
    }
  }

  return (
    <div style={{ maxWidth: 480 }}>
      <h2>Upload Farm Data</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>
            Farmer Name
            <input
              type="text"
              name="farmer_name"
              value={form.farmer_name}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>
            Farm Size (ha)
            <input
              type="number"
              step="0.01"
              name="farm_size"
              value={form.farm_size}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>
            Crop Type
            <input
              type="text"
              name="crop_type"
              value={form.crop_type}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>
            Tree Count
            <input
              type="number"
              name="tree_count"
              value={form.tree_count}
              onChange={handleChange}
              required
              style={{ width: '100%' }}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      {status && <p style={{ marginTop: 10 }}>{status}</p>}
    </div>
  )
}
