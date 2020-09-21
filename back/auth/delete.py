from firebase_admin import auth

def delete_user(uid):
    try:
        auth.delete_user(uid)
    except:
        print("Some error occurred while deleting the account.")