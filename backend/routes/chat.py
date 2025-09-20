from flask import Blueprint, jsonify

chat_bp = Blueprint("chat", __name__)

@chat_bp.route("/", methods=["GET"])
def chat_home():
    return jsonify({"msg": "Chat API (stub)"})
