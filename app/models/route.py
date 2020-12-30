from .db import db

class Route(db.Model):
  __tablename__ = "routes"
  id = db.Column(db.Integer, primary_key=True, nullable=False)
  name = db.Column(db.String(100), nullable=False)
  startLong = db.Column(db.Float, nullable=False)
  endLong = db.Column(db.Float, nullable=False)
  startLat = db.Column(db.Float, nullable=False)
  endLat = db.Column(db.Float, nullable=False)
  distance = db.Column(db.String(100))
  description = db.Column(db.String(255))
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  createdAt = db.Column(db.DateTime, nullable=False)
  updatedAt = db.Column(db.DateTime, nullable=False)

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name,
      "startLong": self.startLong,
      "endLong": self.endLong,
      "startLat": self.startLat,
      "endLat": self.endLat,
      "distance": self.distance,
      "createdAt": self.createdAt,
      "description": self.description,
      "userId": self.userId,
    }