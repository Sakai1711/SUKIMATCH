from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash
from conf import app

# from flask import Flask
# app = Flask(__name__)

@app.route("/user", methods=["POST"])
def sign_up_user():
    given_json = request.json

    # hash
    given_json["password"] = generate_password_hash(given_json["password"])

    # user_id = db_func(given_json["username"], given_json["email"], given_json["password"])
    # provisional
    user_id = 1010120

    responsed_json = {
        "user_id" : user_id
    }

    return jsonify(responsed_json)

@app.route("/user/:id", methods=["GET"])
def load_user_page():
    given_json = request.json

    # username, email, tag = db_func(given_json["id"])

    # provisional
    username = "hoge"
    email = "tmp@hoge.com"
    tag = [{
            "id" : 0,
            "tag_name" : "test1"
        },
        {
            "id": 1,
            "tag_name": "test2"
        }
    ]


    responsed_json = {
        "username" : username,
        "email" : email,
        "tag" : tag # List
    }

    return jsonify(responsed_json)

@app.route("/user/:id", methods=["PUT"])
def edit_user_page():
    given_json = request.json

    given_json["password"] = generate_password_hash(given_json["password"])

    # user_id = db_func(given_json["username"], given_json["email"], given_json["password"])
    # provisional
    user_id = 1010120

    responsed_json = {
        "user_id": user_id
    }

    return jsonify(responsed_json)

@app.route("/user/:id", methods=["DELETE"])
def delete_user():
    given_json = request.json

    # user_id = db_func(given_json["id"])

    responsed_json = {

    }

    return jsonify(responsed_json)


if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=5000)