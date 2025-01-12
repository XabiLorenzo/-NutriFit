import os

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "d4f8b7c2e3a9f1d6a0b5c7e4a2f6b9c8d1e7a3f9c4b8a6e7d3c5b1a9f0e2d4c7")
    # SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:root@localhost/nutrifit_db"
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:root@db_user_service/nutrifit_db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False