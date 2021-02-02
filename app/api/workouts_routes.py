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

# ****************** ROUTE ADD *********************

# @routes_routes.route('/new',methods = ['POST'])
# @login_required
# def routePost():
#     data = request.json
#     route = Route(
#         name=data['name'],
#         startLong=data['startLong'],
#         startLat=data['startLat'],
#         endLat=data['endLat'],
#         endLong=data['endLong'],
#         distance=data['distance'],
#         description=data['description'],
#         userId=data['userId'],
#         createdAt=datetime.now(),
#         updatedAt=datetime.now()
#     )
#     db.session.add(route)
#     db.session.commit()
#     return route.to_dict()

# ****************** ROUTE DELETE *********************

# @routes_routes.route('/<int:id>', methods = ['DELETE'])
# @login_required
# def routeDelete(id):
#     route = Route.query.get(id)
#     db.session.delete(route)
#     db.session.commit()
#     return {'primaryKey': id}