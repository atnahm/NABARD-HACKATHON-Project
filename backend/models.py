from datetime import datetime
from typing import Optional

from sqlalchemy import Column, Integer, String, Float, DateTime, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# SQLite database URL
SQLALCHEMY_DATABASE_URL = "sqlite:///./farms.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


class Farm(Base):
    __tablename__ = "farms"

    id = Column(Integer, primary_key=True, index=True)
    farmer_name = Column(String, index=True, nullable=False)
    farm_size = Column(Float, nullable=False)
    crop_type = Column(String, nullable=False)
    tree_count = Column(Integer, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow, nullable=False)


# Create tables if they do not exist
Base.metadata.create_all(bind=engine)
