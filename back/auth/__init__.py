# Author Nagai
import pyrebase
import json
import os

API_KEY = os.environ['API_KEY']
PRJ_ID = os.environ['PRJ_ID']
config = {
  "apiKey": API_KEY,
  "authDomain": PRJ_ID + ".firebaseapp.com",
  "databaseURL": "https://" + PRJ_ID + ".firebaseio.com/",
  "storageBucket": PRJ_ID + ".appspot.com"
}
#conf = json.load(open("back/conf.json", 'r'))
firebase = pyrebase.initialize_app(config)
auth = firebase.auth()

from .auth import signup, signin, verify
