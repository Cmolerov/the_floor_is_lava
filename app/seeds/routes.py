from app.models import db, Route
from datetime import datetime

# Adds a demo user, you can add other users here if you want
def seed_routes():

    routes = Route(name='Boston Harbor Run',
                description='Running pleasantly along the Boston harbor.  Explore the birthplace of America.',
                userId=1,
                startLat=42.35796768090105,
                startLong=-71.07336678423798,
                endLat=42.369803176648205,
                endLong=-71.06982626829688,
                createdAt=datetime.now(),
                updatedAt=datetime.now())

    db.session.add(routes)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_routes():
    db.session.execute('TRUNCATE routes;')
    db.session.commit()
