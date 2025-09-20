from flask import Blueprint, request, jsonify
from extensions import db, bcrypt, jwt
from models import User

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        return jsonify({"msg": "Login successful"}), 200
    return jsonify({"msg": "Invalid credentials"}), 401
