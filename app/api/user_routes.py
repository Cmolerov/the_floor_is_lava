from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Route

user_routes = Blueprint('users', __name__)

# ****************** USERS SEARCH *********************

@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}

# ****************** USER SEARCH *********************

@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


# ****************** ROUTES SEARCH *********************

@user_routes.route('/<int:id>/routes')
@login_required
def routes(id):
    # print("THIS IS THE ID FOR BACKEND ROUTES", id)
    routes = Route.query.filter_by(userId=id).all()
    # print("THESE ARE THE ROUTES FOR BACKEND", routes)
    return {route.id:route.to_dict() for route in routes}
