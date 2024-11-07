from app import db
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    age = db.Column(db.Integer, nullable=True)
    weight = db.Column(db.Float, nullable=True)  # Peso en kg
    height = db.Column(db.Float, nullable=True)  # Altura en cm
    calorie_goal = db.Column(db.Integer, nullable=True)  # Objetivo de calorías diarias
    protein_goal = db.Column(db.Float, nullable=True)    # Objetivo de proteínas diarias en gramos
    carb_goal = db.Column(db.Float, nullable=True)       # Objetivo de carbohidratos diarios en gramos
    fat_goal = db.Column(db.Float, nullable=True)        # Objetivo de grasas diarias en gramos
    username = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def __repr__(self):
        return f"<User {self.name}>"