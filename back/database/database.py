import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# Use a service account
cred = credentials.Certificate('database/sukimatch-21753-firebase-adminsdk-pbpyr-2612a3104c.json')
firebase_admin.initialize_app(cred)

db = firestore.client()