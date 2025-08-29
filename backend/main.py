from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from typing import Optional

from models import SessionLocal, Farm  # type: ignore

app = FastAPI()

# Allow Vite dev server
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Carbon MRV Prototype Backend Running 🚀"}

# -----------------------------
# Database dependency
# -----------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# -----------------------------
# Pydantic Schemas
# -----------------------------
class FarmCreate(BaseModel):
    farmer_name: str = Field(..., min_length=1)
    farm_size: float = Field(..., ge=0)
    crop_type: str = Field(..., min_length=1)
    tree_count: int = Field(..., ge=0)

# -----------------------------
# Endpoints
# -----------------------------
@app.post("/upload_data")
def upload_data(payload: FarmCreate, db: Session = Depends(get_db)):
    new_farm = Farm(
        farmer_name=payload.farmer_name,
        farm_size=payload.farm_size,
        crop_type=payload.crop_type,
        tree_count=payload.tree_count,
    )
    db.add(new_farm)
    db.commit()
    db.refresh(new_farm)
    return {"status": "success", "id": new_farm.id}

@app.get("/farm_report")
def farm_report(farmer_name: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Farm)
    if farmer_name:
        query = query.filter(Farm.farmer_name == farmer_name)
    farm = query.order_by(Farm.timestamp.desc()).first()
    if not farm:
        raise HTTPException(status_code=404, detail="No farm data found")
    carbon_savings = farm.tree_count * 0.5  # simple mock formula
    return {
        "farmer_name": farm.farmer_name,
        "farm_size": farm.farm_size,
        "crop_type": farm.crop_type,
        "tree_count": farm.tree_count,
        "carbon_savings": carbon_savings,
        "timestamp": farm.timestamp.isoformat(),
    }
