from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Route, db
from datetime import datetime
import os

routes_routes = Blueprint('routes', __name__)
apiKey = os.environ.get('GOOGLE_API')

# ****************** ROUTE SEARCH *********************

@routes_routes.route('/<int:id>')
@login_required
def route(id):
    # print("THIS IS THE ID FOR BACKEND ROUTE", id)
    returnRoute = Route.query.filter_by(id=id).one()
    # print("THIS IS THE ROUTE FOR BACKEND", route)
    route = returnRoute.to_dict()
    return {'route': route, 'apiKey': apiKey}

# ****************** ROUTE ADD *********************

@routes_routes.route('/new',methods = ['POST'])
@login_required
def routePost():
    data = request.json
    print(data)
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
    print("POST ROUTE IS CONNECTING")