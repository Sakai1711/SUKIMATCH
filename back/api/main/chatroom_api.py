from flask import Flask, request, jsonify
from . import app
import sys
sys.path.append('../')
from database.chatroom import add_chatroom, check_chatroom, delete_user
from auth.auth import verify

@app.route("/chatrooms/<chatroom_id>", methods=["GET"])
def get_chatroom_users(chatroom_id):
    access_token = request.headers.get("access_token")
    user_id = verify(access_token)
    if user_id == '':
        return _corsify_actual_response(jsonify({})), 401
    users = check_chatroom(chatroom_id)
    if users != 4:
        return _corsify_actual_response(jsonify({ 'num_of_users': users })), 205
    return _corsify_actual_response(jsonify({ 'num_of_users': users })), 200

@app.route("/chatrooms", methods=["POST"])
def join_chatroom():
    access_token = request.headers.get("access_token")
    given_json = request.json
    tag_name = given_json['tag_name']
    user_id = verify(access_token)
    if user_id == '':
        return _corsify_actual_response(jsonify({})), 401
    chatroom_id = add_chatroom(user_id, tag_name)
    return _corsify_actual_response(jsonify({ 'chatroom_id': chatroom_id })), 200

@app.route("/chatrooms/<chatroom_id>/cancel", methods=["POST"])
def delete_user_from_chatroom(chatroom_id):
    access_token = request.headers.get("access_token")
    given_json = request.json
    user_id = verify(access_token)
    print(chatroom_id)
    if user_id == '':
        return _corsify_actual_response(jsonify({})), 401
    delete_user(chatroom_id, user_id)
    return _corsify_actual_response(jsonify({})), 204

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

