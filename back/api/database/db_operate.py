import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from .model import User

# Use a service account
cred = credentials.Certificate('database/sukimatch-21753-firebase-adminsdk-pbpyr-2612a3104c.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

def main():

    doc_ref = db.collection(u'User').document()
    doc_ref.set(
        User(email=u'example@python.ac.jp',
             password=u'pass',
             name=u'dev').to_dict()
    )

def add_new_user(username, email, password):

    doc_ref = db.collection(u'User').document()
    doc_ref.set(
        User(email=f'{email}',
             password=f'{password}',
             name=f'{username}').to_dict()
    )

    # Get id (document)
    user_ref = db.collection(u'User')
    query = user_ref.where(
        u'email', u'==', email).stream()

    id = None
    for i, q in enumerate(query):

        # print(u'{} => {}'.format(q.id, q.to_dict()))

        # Error handling
        # if registering with the same email address.
        # if i >= 2:
        #     return None

        id = q.id

    return id

if __name__ == '__main__':
    id = add_new_user(username=u'1', email=u'ample@tmp.jp', password=u'oge')
    print(id)