from google.cloud.exceptions import NotFound
from ..database.model import User
from ..database.database import db


def add_new_user(user_id, email, name):

    doc_ref = db.collection(u'User').document(user_id)
    doc_ref.set(
        User(email=f'{email}',
             name=f'{name}',).to_dict()
    )

def load_mypage(user_id):
    user_ref = db.collection(u'User').document(f'{user_id}')
    try:
        user_data = user_ref.get().to_dict()
        return user_data["name"], user_data["email"]

    except NotFound:
        print(u'No such document!')

def update_data(user_id, username, email):
    user_ref = db.collection(u'User').document(f'{user_id}')

    try:
        user_ref.update(
            User(email=f'{email}',
                 name=f'{username}',
                 ).to_dict()
        )

    except NotFound:
        print(u'No such document!')

def delete_data(user_id):
    db.collection(u'User').document(user_id).delete()

# if __name__ == '__main__':
#     main()