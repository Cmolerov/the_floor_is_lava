from .db import db

class Route(db.Model):
  __tablename__ = "workouts"
  id = db.Column(db.Integer, primary_key=True, nullable=False)
  startLong = db.Column(db.Float, nullable=False)
  endLong = db.Column(db.Float, nullable=False)
  startLat = db.Column(db.Float, nullable=False)
  endLat = db.Column(db.Float, nullable=False)
  distance = db.Column(db.String(100))
  time = db.Column(db.String(255))
  routeId = db.Column(db.Integer, db.ForeignKey('routes.id'), nullable=False)
  createdAt = db.Column(db.DateTime, nullable=False)
  updatedAt = db.Column(db.DateTime, nullable=False)

  def to_dict(self):
    return {
      "id": self.id,
      "startLong": self.startLong,
      "endLong": self.endLong,
      "startLat": self.startLat,
      "endLat": self.endLat,
      "distance": self.distance,
      "time": self.time,
      "routeId": self.routeId,
      "createdAt": self.createdAt,
      "updatedAt": self.updatedAt,
    }