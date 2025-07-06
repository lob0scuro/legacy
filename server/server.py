from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)
CORS(app)
db = SQLAlchemy(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI', 'sqlite:///default.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'defaultsecret')


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=True)
    uploads = db.relationship('Image', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.name}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'uploads': [image.serialize() for image in self.uploads]
        }
        
class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(120), unique=True, nullable=False)
    uploaded_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    

    def __repr__(self):
        return f'<Image {self.filename}>'
    
    def serialize(self):
        return {
            'id': self.id,
            'url': self.url,
            'uploaded_by': self.uploaded_by
        }
        
        
@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    url = data.get('url')
    
    if not name:
        return jsonify({"error": "Name is required"}), 400
    try:
        new_user = User(name=name.capitalize(), email=email if email else None)
        db.session.add(new_user)
        db.session.commit()
        new_image = Image(url=url, uploaded_by=new_user.id) if url else None
        if new_image:
            db.session.add(new_image)
            db.session.commit()
            new_user.uploads.append(new_image)
            db.session.commit()
        
        
        return jsonify(new_user.serialize()), 201
    except Exception as e:
        db.session.rollback()
        print(f"Error adding user: {e}")
        return jsonify(error=f"A server error occurred when adding user"), 500