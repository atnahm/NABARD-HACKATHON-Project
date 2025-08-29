import { useState } from 'react'
import axios from 'axios'

export default function Report() {
  const [farmerName, setFarmerName] = useState('')
  const [report, setReport] = useState(null)
  const [status, setStatus] = useState('')

  const fetchReport = async () => {
    setStatus('Loading...')
    setReport(null)
    try {
      const params = farmerName ? { farmer_name: farmerName } : {}
      const res = await axios.get('http://127.0.0.1:8000/farm_report', { params })
      setReport(res.data)
      setStatus('')
    } catch (err) {
      setStatus('No report found. Upload data first.')
    }
  }

  return (
    <div style={{ maxWidth: 520 }}>
      <h2>Farm Carbon Report</h2>
      <div style={{ marginBottom: 8 }}>
        <label>
          Filter by Farmer Name (optional)
          <input
            type="text"
            value={farmerName}
            onChange={(e) => setFarmerName(e.target.value)}
            style={{ width: '100%' }}
          />
        </label>
      </div>
      <button onClick={fetchReport}>Get Report</button>

      {status && <p style={{ marginTop: 10 }}>{status}</p>}

      {report && (
        <div style={{ marginTop: 16, padding: 12, border: '1px solid #ddd' }}>
          <p><b>Farmer:</b> {report.farmer_name}</p>
          <p><b>Farm Size (ha):</b> {report.farm_size}</p>
          <p><b>Crop Type:</b> {report.crop_type}</p>
          <p><b>Tree Count:</b> {report.tree_count}</p>
          <p><b>Carbon Savings:</b> {report.carbon_savings}</p>
          <p><b>Timestamp:</b> {report.timestamp}</p>
        </div>
      )}
    </div>
  )
}
