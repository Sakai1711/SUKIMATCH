
import pyrebase
import json

conf = json.load(open("back/conf.json", 'r'))
firebase = pyrebase.initialize_app(conf)
auth = firebase.auth()

from .auth_user import signup, signin, verify

import firebase_admin
from firebase_admin import credentials