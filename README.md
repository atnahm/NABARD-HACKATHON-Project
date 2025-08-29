# Carbon MRV Prototype

## Overview
This is a **prototype** for a Carbon Measurement, Reporting, and Verification (MRV) system.

## Day 1 Progress
-  Backend setup with FastAPI
-  Frontend setup with React + Vite
-  Connection between frontend & backend
-  Data folder created

##  Run Instructions
### Backend
``bash
cd backend
.\venv\Scripts\activate  # (Windows PowerShell)
# source venv/bin/activate  # (Linux/Mac)
uvicorn main:app --reload
``

### Frontend (use cmd.exe on Windows)
``cmd
cd frontend
npm run dev
``

Then open frontend link (usually http://localhost:5173) and check if it shows:
'Carbon MRV Prototype Backend Running 🚀'
