from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Workout, db
from datetime import datetime
import os

workouts_routes = Blueprint('workouts', __name__)

# ****************** ROUTES SEARCH *********************

# @routes_routes.route('/<int:id>')
# @login_required
# def route(id):
#     returnWorkouts = Route.query.filter_by(id=id).all()
#     workouts = returnWorkouts.to_dict()
#     return {'route': route, 'apiKey': apiKey}

****************** WORKOUT ADD *********************

@workouts_routes.route('/',methods = ['POST'])
@login_required
def workoutPost():
    data = request.json
    workout = Route(
        time=data['time'],
        startLong=data['startLong'],
        startLat=data['startLat'],
        endLat=data['endLat'],
        endLong=data['endLong'],
        distance=data['distance'],
        isCompleted=data['isCompleted'],
        routeId=data['routeId'],
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    db.session.add(workout)
    db.session.commit()
    return workout.to_dict()

# ****************** ROUTE DELETE *********************

# @routes_routes.route('/<int:id>', methods = ['DELETE'])
# @login_required
# def routeDelete(id):
#     route = Route.query.get(id)
#     db.session.delete(route)
#     db.session.commit()
#     return {'primaryKey': id}