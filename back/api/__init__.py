# Author Nagai Ryusei
from flask import Flask
from flask_socketio import SocketIO
from flask_cors import CORS

socketio = SocketIO()

def create_app(debug=False):
    """Create an application."""
    app = Flask(__name__)
    CORS(app)
    app.debug = debug
    app.config['SECRET_KEY'] = 'gjr39dkjn344_!67#'

    from .main import app as app_blueprint
    app.register_blueprint(app_blueprint)

    socketio.init_app(app, cors_allowed_origins="*")
    return app