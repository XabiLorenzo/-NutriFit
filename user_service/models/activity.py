from app import db

class Activity(db.Model):
    __tablename__ = 'activities'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    type = db.Column(db.String(100), nullable=False)
    duration = db.Column(db.Integer, nullable=False)  # Duración en minutos
    intensity = db.Column(db.String(50), nullable=False)  # Intensidad (baja, media, alta)
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())  # Fecha y hora de registro

    user = db.relationship("User", backref="activities")