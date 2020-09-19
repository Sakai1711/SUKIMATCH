from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from . import app
import sys
sys.path.append('../')
#from database.model import Tag

#cred = credentials.Certificate('./sukimatch-21753-firebase-adminsdk-pbpyr-71cf5581f2.json')
#firebase_admin.initialize_app(cred)
#db = firestore.client()

@app.route("/tag", methods=["POST"])
def insert_tag():
    given_json = request.json
    tag_name = given_json['name']
    unique_flag = 1
    #########
    ## DB処理
    #########
    if unique_flag == 1:
        return jsonify({}), 204
    else:
        return jsonify({}), 400

@app.route("/tags", methods=["GET"])
def get_tags():
    access_token = request.headers.get("access_token")
    tags = [
        {
            'id': 0,
            'name': 'aaa'
        }
    ]
    #########
    ## DB処理
    #########
    return jsonify({ 'tags': tags }), 200

@app.route("/tag/delete", methods=["POST"])
def delete_tag():
    access_token = request.headers.get("access_token")
    given_json = request.json
    tag_name = given_json['tag_id']
    exist_flag = 1
    #########
    ## DB処理
    #########
    if exist_flag == 1:
        return jsonify({}), 200
    else:
        return jsonify({}), 404

