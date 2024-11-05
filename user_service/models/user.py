from app import db

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

    def __repr__(self):
        return f"<User {self.name}>"