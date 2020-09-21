from flask import Flask, request, jsonify
from . import app
import sys
sys.path.append('../')
from database.user import add_new_user, load_mypage, update_data, delete_data
from auth.auth_user import signup, signin, verify, refresh_token
from auth.update import update_user
from auth.delete import delete_user


@app.route("/user", methods=["POST"])
def sign_up_user():
    given_json = request.json

    # Make token and id
    access_token, user_id = signup(
        email=given_json["email"],
        password=given_json["password"]
    )
    # provisional
    # access_token = "qawse"
    # user_id = "1010120"

    # Store to database
    add_new_user(
        user_id=user_id,
        email=given_json["email"],
        name=given_json["username"]
    )

    responsed_json = {
        "token": access_token
    }

    return jsonify(responsed_json), 200


@app.route("/login", methods=["POST"])
def sign_in_user():
    given_json = request.json

    # Authentication
    access_token = signin(
        email=given_json["email"],
        password=given_json["password"]
    )
    # provisional
    # access_token = "qawse"
    # user_id = "1010120"

    responsed_json = {
        "token": access_token
    }

    return jsonify(responsed_json), 200


@app.route("/user/<string:access_token>", methods=["GET"])
def load_user_page(access_token):
    # Convert token to ID
    user_id = verify(access_token)
    if user_id == "":
        return jsonify({}), 401

    username, email, tags = load_mypage(user_id)

    # provisional
    # username = "hoge"
    # email = "tmp@hoge.com"
    # tag = [{
    #         "id" : 0,
    #         "tag_name" : "test1"
    #     },
    #     {
    #         "id": 1,
    #         "tag_name": "test2"
    #     }
    # ]

    responsed_json = {
        "username": username,
        "email": email,
        "tag": tags  # List
    }

    return jsonify(responsed_json), 200


@app.route("/user/<string:access_token>", methods=["POST"])
def operate_user_page(access_token):
    # Convert token to ID
    user_id = verify(access_token)
    if user_id == "":
        return jsonify({}), 401

    given_json = request.json
    given_json["user_id"] = user_id

    if given_json["is_delete"]:

        given_json["token"] = access_token
        return delete_account(given_json), 200

    else:

        return edit_user_page(given_json), 200


def edit_user_page(param):
    given_json = param

    # update Auth data
    user = update_user(given_json["user_id"], given_json["username"], given_json["email"], given_json["password"])

    # update Database
    update_data(given_json["username"], given_json["email"], given_json["password"])
    # provisional
    # user_id = 1010120

    # "firebase_admin.update_user"でuidが変わる...??
    # リフレッシュすればいける？
    new_token = refresh_token(given_json["token"])

    responsed_json = {
        "user_id": new_token
    }

    return jsonify(responsed_json)


def delete_account(param):
    given_json = param

    # delete Auth data
    delete_user(given_json["user_id"])
    # delete Database
    delete_data(given_json["user_id"])

    responsed_json = {

    }

    return jsonify(responsed_json)
