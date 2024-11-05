from flask import Blueprint, request, jsonify
from models.user import User
from models.activity import Activity  
from app import db

user_blueprint = Blueprint("users", __name__)

# Ruta para crear un usuario
@user_blueprint.route("/users", methods=["POST"])
def create_user():
    data = request.json
    new_user = User(
        name=data["name"],
        email=data["email"],
        age=data.get("age"),
        weight=data.get("weight"),
        height=data.get("height"),
        calorie_goal=data.get("calorie_goal"),
        protein_goal=data.get("protein_goal"),
        carb_goal=data.get("carb_goal"),
        fat_goal=data.get("fat_goal")
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created"}), 201

# Ruta para obtener los detalles de un usuario por ID
@user_blueprint.route("/users/<int:user_id>", methods=["GET"])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "age": user.age,
        "weight": user.weight,
        "height": user.height,
        "calorie_goal": user.calorie_goal,
        "protein_goal": user.protein_goal,
        "carb_goal": user.carb_goal,
        "fat_goal": user.fat_goal
    })

# Ruta para actualizar los objetivos nutricionales de un usuario
@user_blueprint.route("/users/<int:user_id>/goals", methods=["PUT"])
def update_goals(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    data = request.json
    user.calorie_goal = data.get("calorie_goal", user.calorie_goal)
    user.protein_goal = data.get("protein_goal", user.protein_goal)
    user.carb_goal = data.get("carb_goal", user.carb_goal)
    user.fat_goal = data.get("fat_goal", user.fat_goal)
    db.session.commit()
    return jsonify({"message": "Goals updated successfully"}), 200


@user_blueprint.route("/users/<int:user_id>/activity", methods=["POST"])
def add_activity(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    data = request.json
    new_activity = Activity(
        user_id=user_id,
        type=data.get("type"),
        duration=data.get("duration"),
        intensity=data.get("intensity")
    )
    db.session.add(new_activity)
    db.session.commit()
    return jsonify({"message": "Activity recorded"}), 201


@user_blueprint.route("/users/<int:user_id>/activity", methods=["GET"])
def get_activities(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    activities = [
        {
            "id": activity.id,
            "type": activity.type,
            "duration": activity.duration,
            "intensity": activity.intensity,
            "timestamp": activity.timestamp
        }
        for activity in user.activities
    ]
    return jsonify(activities), 200