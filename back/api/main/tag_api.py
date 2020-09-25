# Author Nagai Ryusei - fix import and _corsify_actual_response
# Author Sakai Atsuya - all except Nagai's part
from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from . import app
import sys
sys.path.append('../')
from database.tag import insert_tag, get_tags, delete_tag, exists
from auth.auth import verify

@app.route("/tag", methods=["POST"])
def insert_db_tag():
    access_token = request.headers.get("access_token")
    given_json = request.json
    tag_name = given_json['tag_name']
    user_id = verify(access_token)
    if user_id == '':
        return _corsify_actual_response(jsonify({})), 401
    exist_flag = exists(user_id, tag_name)
    if exist_flag == 1:
        return _corsify_actual_response(jsonify({})), 400
    insert_tag(user_id, tag_name)
    return _corsify_actual_response(jsonify({})), 204

@app.route("/tags", methods=["GET"])
def get_db_tags():
    access_token = request.headers.get("access_token")
    user_id = verify(access_token)
    if user_id == '':
        return _corsify_actual_response(jsonify({})), 401
    tags = get_tags(user_id)
    return _corsify_actual_response(jsonify({ 'tags': tags })), 200

@app.route("/tag/delete", methods=["POST"])
def delete_db_tag():
    access_token = request.headers.get("access_token")
    given_json = request.json
    tag_name = given_json['tag_name']
    user_id = verify(access_token)
    if user_id == '':
        return _corsify_actual_response(jsonify({})), 401
    exist_flag = exists(user_id, tag_name)
    if exist_flag == 0:
        return _corsify_actual_response(jsonify({})), 404
    delete_tag(user_id, tag_name)
    return _corsify_actual_response(jsonify({})), 204
      
def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

