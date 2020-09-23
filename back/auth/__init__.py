import pyrebase
import json

conf = json.load(open("back/conf.json", 'r'))
firebase = pyrebase.initialize_app(conf)
auth = firebase.auth()

from .auth import signup, signin, verify
