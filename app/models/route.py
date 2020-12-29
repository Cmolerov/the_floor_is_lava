from .db import db

class Route(db.Model):
  __tablename__ = "routes"
  id = db.Column(db.Integer, primary_key=True, nullable=False)
  name = db.Column(db.String(100), nullable=False)
  startLong = db.Column(db.Integer, nullable=False)
  endLong = db.Column(db.Integer, nullable=False)
  startLat = db.Column(db.Integer, nullable=False)
  endLat = db.Column(db.Integer, nullable=False)
  distance = db.Column(db.Integer)
  description = db.Column(db.String(255))
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  createdAt = db.Column(db.DateTime, nullable=False)
  updatedAt = db.Column(db.DateTime, nullable=False)