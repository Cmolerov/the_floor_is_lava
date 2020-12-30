from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Route
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

@routes_routes.route('/',methods = ['POST'])
@login_required
def routePost():
    # print("THIS IS THE ID FOR BACKEND ROUTE", id)
    # route = Route.query.filter_by(id=id).one()
    # print("THIS IS THE ROUTE FOR BACKEND", route)
    # return route.to_dict()
    print("POST ROUTE IS CONNECTING")