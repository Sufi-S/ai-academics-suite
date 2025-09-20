import os

from flask import Flask, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database config (from .env file)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'DATABASE_URL',
    'mysql+pymysql://root:1234@localhost/quizhive'  # fallback if .env missing
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Security keys
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', '0e18f9739b8f6a3b30a0c48126e8cb6cde5334e5fcbdb765f66444b777455c0a')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', '0e18f9739b8f6a3b30a0c48126e8cb6cde5334e5fcbdb765f66444b777455c0a')

# Uploads folder
app.config['UPLOAD_FOLDER'] = os.getenv('UPLOAD_FOLDER', './uploads')

# Initialize extensions
db = SQLAlchemy(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Import models and routes after db initialized
from models import *
from routes import auth_bp, users_bp, quizzes_bp, assignments_bp, chat_bp, files_bp

# Register blueprints
app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(users_bp, url_prefix="/api/users")
app.register_blueprint(quizzes_bp, url_prefix="/api/quizzes")
app.register_blueprint(assignments_bp, url_prefix="/api/assignments")
app.register_blueprint(chat_bp, url_prefix="/api/chat")
app.register_blueprint(files_bp, url_prefix="/api/files")

# Create tables
with app.app_context():
    db.create_all()
    
    # Create a test user if none exists
    if not User.query.first():
        test_student = User(
            name="Alex Johnson",
            email="student@test.com",
            password=bcrypt.generate_password_hash("password123").decode('utf-8'),
            role="student"
        )
        test_teacher = User(
            name="Dr. Emily Watson",
            email="teacher@test.com",
            password=bcrypt.generate_password_hash("password123").decode('utf-8'),
            role="teacher"
        )
        db.session.add(test_student)
        db.session.add(test_teacher)
        db.session.commit()
        print("Test users created:")
        print("Student: student@test.com / password123")
        print("Teacher: teacher@test.com / password123")

# Test route
@app.route('/api/ping')
def ping():
    return jsonify({"msg": "pong"})

# Entry point
if __name__ == "__main__":
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    app.run(host='0.0.0.0', port=5000, debug=True)
