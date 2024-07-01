from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os


# engine = create_engine(os.getenv("SQLALCHEMY_DATABASE_URL"))
engine = create_engine("postgresql://postgres:postgres@localhost:5432/Book")
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
Base.metadata.create_all(bind=engine)