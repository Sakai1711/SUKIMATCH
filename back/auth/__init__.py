<<<<<<< HEAD

=======
>>>>>>> fa4ab8bd23180bb8398e9b88bd27b399092caf87
import pyrebase
import json

conf = json.load(open("back/conf.json", 'r'))
firebase = pyrebase.initialize_app(conf)
auth = firebase.auth()

<<<<<<< HEAD
from .auth_user import signup, signin, verify

import firebase_admin
from firebase_admin import credentials
=======
from .auth import signup, signin, verify
>>>>>>> fa4ab8bd23180bb8398e9b88bd27b399092caf87
