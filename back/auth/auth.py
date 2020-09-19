import pyrebase
import json

conf = json.load(open("back/auth/conf.json", 'r'))
firebase = pyrebase.initialize_app(conf)
auth = firebase.auth()

def signup(email, password):
    """
    Parameters:
        email
        password
    Returns:
        access_token
        user_id
    """
    user = auth.create_user_with_email_and_password(email, password)
    access_token = user['idToken']
    user_id = user['localId']
    return access_token, user_id

def signin(email, password):
    """
    Parameters:
        email
        password
    Returns:
        access_token
    """
    user = auth.sign_in_with_email_and_password(email, password)
    access_token = user['idToken']
    return access_token

def verify(access_token):
    """
    Parameters:
        access_token
    Returns:
        user_id
    """
    try:
        user = auth.get_account_info(access_token)
        user_id = user['users'][0]['localId']
        return user_id
    except:
        return {}
