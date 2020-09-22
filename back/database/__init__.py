import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import os

PRIVATE_KEY_ID = os.environ["PRIVATE_KEY_ID"]
PRIVATE_KEY = os.environ["PRIVATE_KEY"]
CLIENT_EMAIL = os.environ["CLIENT_EMAIL"]
CLIENT_ID = os.environ["CLIENT_ID"]
AUTH_URI = os.environ["AUTH_URI"]
TOKEN_URI = os.environ["TOKEN_URI"]
AUTH_PROVIDER = os.environ["AUTH_PROVIDER"]
CLIENT_URL = os.environ["CLIENT_URL"]
config = {
  "type": "service_account",
  "project_id": "sukimatch-21753",
  "private_key_id": PRIVATE_KEY_ID,
  "private_key": PRIVATE_KEY,
  "client_email": CLIENT_EMAIL,
  "client_id": CLIENT_ID,
  "auth_uri": AUTH_URI,
  "token_uri": TOKEN_URI,
  "auth_provider_x509_cert_url": AUTH_PROVIDER,
  "client_x509_cert_url": CLIENT_URL
}
cred = credentials.Certificate(config)
firebase_admin.initialize_app(cred)

db = firestore.client()

from .model import Tag, Chatroom, User
from .chatroom import add_chatroom, check_chatroom, delete_chatroom