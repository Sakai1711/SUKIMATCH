from google.cloud.exceptions import NotFound
from model import User
from database import db

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

    user_id = None
    for i, q in enumerate(query):

        # print(u'{} => {}'.format(q.id, q.to_dict()))

        # Error handling
        # if registering with the same email address.
        # if i >= 2:
        #     return None

        user_id = q.id

    return user_id

def load_mypage(user_id):
    user_ref = db.collection(u'User').document(f'{user_id}')
    try:
        user_data = user_ref.get().to_dict()
        return user_data["name"], user_data["email"], user_data["tags"]

    except NotFound:
        print(u'No such document!')

def update_data(user_id, username, email, password):
    user_ref = db.collection(u'User').document(user_id)

    try:
        user_ref.update(
            User(email=f'{email}',
                 password=f'{password}',
                 name=f'{username}').to_dict()
        )

    except google.cloud.exceptions.NotFound:
        print(u'No such document!')

    return user_id

def delete_data(user_id):
    db.collection(u'User').document(user_id).delete()

if __name__ == '__main__':
    main()