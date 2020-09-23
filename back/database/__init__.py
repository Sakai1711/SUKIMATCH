import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("back/sukimatch-21753-firebase-adminsdk-pbpyr-b48f70c7fe.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

from .model import Tag, Chatroom, User
from .chatroom import add_chatroom, check_chatroom, delete_chatroom