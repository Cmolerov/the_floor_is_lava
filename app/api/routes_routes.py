from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Route

routes_routes = Blueprint('routes', __name__)

# ****************** ROUTE SEARCH *********************

@routes_routes.route('/<int:id>')
@login_required
def route(id):
    # print("THIS IS THE ID FOR BACKEND ROUTE", id)
    route = Route.query.filter_by(id=id).one()
    print("THIS IS THE ROUTE FOR BACKEND", route)
    return route.to_dict()
