#import sys, os
#sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
#sys.path.append('../')
#from app import auth
from . import auth

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
    print(user)
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
        return ""

def refresh_token(access_token):
    """
    Parameters:
        access_token
    Returns:
        user_id
    """
    try:
        user = auth.refresh(access_token)
        new_token = user['users'][0]["refresh_token"]
        return new_token
    except:
        return ""