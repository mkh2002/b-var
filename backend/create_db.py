import time
from app import db, app

time.sleep(10)

with app.context():
    db.create_all()