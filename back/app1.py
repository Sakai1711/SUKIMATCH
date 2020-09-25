# Author Nagai
from api import create_app, socketio
from database import db
from auth import auth

app = create_app(debug=True)

if __name__ == '__main__':
    socketio.run(app)
