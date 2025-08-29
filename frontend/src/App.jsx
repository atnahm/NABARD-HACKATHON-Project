import { useState } from 'react'
import './App.css'
import UploadData from './UploadData.jsx'
import Report from './Report.jsx'

function App() {
  const [page, setPage] = useState('upload')

  return (
    <div className="bp5-ui-text" style={{ padding: '24px', minHeight: '100vh' }}>
      <div className="bp5-card" style={{ maxWidth: 900, margin: '0 auto' }}>
        <h1 className="bp5-heading">🌍 Carbon MRV Prototype</h1>
        <div style={{ marginBottom: 12 }}>
          <button className="bp5-button bp5-intent-primary" onClick={() => setPage('upload')}>
            Upload Data
          </button>
          <button
            className="bp5-button"
            style={{ marginLeft: 8 }}
            onClick={() => setPage('report')}
          >
            View Report
          </button>
        </div>
        <div>{page === 'upload' ? <UploadData /> : <Report />}</div>
      </div>
    </div>
  )
}

export default App
