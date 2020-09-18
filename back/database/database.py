import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("RAKUTEN/sukimatch/TeamA/back/database/sukimatch-21753-firebase-adminsdk-pbpyr-b48f70c7fe.json")
firebase_admin.initialize_app(cred)

db = firestore.client()