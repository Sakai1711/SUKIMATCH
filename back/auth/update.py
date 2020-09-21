from firebase_admin import auth

def update_user(uid, display_name=None, email=None, password=None):
    return auth.update_user(uid, display_name=display_name, email=email, password=password)