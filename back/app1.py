"""
from api import create_app, socketio
from database import db
from auth import auth

app = create_app(debug=True)

#conf = json.load(open("back/conf.json", 'r'))
#firebase = pyrebase.initialize_app(conf)
#auth = firebase.auth()

#cred = credentials.Certificate("back/sukimatch-21753-firebase-adminsdk-pbpyr-b48f70c7fe.json")
#firebase_admin.initialize_app(cred)
#db = firestore.client()

if __name__ == '__main__':
    socketio.run(app)
"""