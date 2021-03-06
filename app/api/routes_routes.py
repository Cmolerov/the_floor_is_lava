from flask import Blueprint, jsonify, request
from flask_login import login_required
from sqlalchemy import desc
from app.models import Route, Workout, db
from datetime import datetime
import os

routes_routes = Blueprint('routes', __name__)
apiKey = os.environ.get('GOOGLE_API')

# ****************** ROUTE SEARCH *********************

@routes_routes.route('/<int:id>')
@login_required
def route(id):
    returnRoute = Route.query.filter_by(id=id).one()
    route = returnRoute.to_dict()
    print("SINGLE ROUTE IS:", route)
    return {'route': route, 'apiKey': apiKey}

# ****************** ROUTE ADD *********************

@routes_routes.route('/new',methods = ['POST'])
@login_required
def routePost():
    data = request.json
    route = Route(
        name=data['name'],
        startLong=data['startLong'],
        startLat=data['startLat'],
        endLat=data['endLat'],
        endLong=data['endLong'],
        distance=data['distance'],
        description=data['description'],
        userId=data['userId'],
        createdAt=datetime.now(),
        updatedAt=datetime.now()
    )
    db.session.add(route)
    db.session.commit()
    return route.to_dict()

# ****************** ROUTE DELETE *********************

@routes_routes.route('/<int:id>', methods = ['DELETE'])
@login_required
def routeDelete(id):
    workouts = Workout.query.filter_by(routeId=id).delete()
    route = Route.query.get(id)
    db.session.delete(route)
    db.session.commit()
    return {'primaryKey': id}

# ****************** WORKOUTS SEARCH *********************

@routes_routes.route('/<int:id>/workouts')
@login_required
def routes(id):
    returnWorkouts = Workout.query.filter_by(routeId=id).order_by(Workout.createdAt.desc()).all()
    print("THESE ARE THE WORKOUTS", returnWorkouts)
    workouts = {workout.id: workout.to_dict() for workout in returnWorkouts}
    return {'workouts': workouts}