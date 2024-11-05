from flask import Blueprint, request, jsonify
from models.user import User
from app import db

user_blueprint = Blueprint("users", __name__)

@user_blueprint.route("/users", methods=["POST"])
def create_user():
    data = request.json
    new_user = User(name=data["name"], email=data["email"], age=data.get("age"))
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created"}), 201