from flask import Flask, request, jsonify
from . import app
import sys
#sys.path.append('../')
from ...database import Chatroom
from ...auth import verify

@app.route("/chatrooms/search/<chatroom_id>", methods=["GET"])
def search_chatroom_id(chatroom_id):
    access_token = request.headers.get("access_token")
    #########
    ## DB処理
    #########
    return jsonify({
        'Status': 200,
        'Message': 'OK'
    }), 200

@app.route("/chatroom/create", methods=["POST"])
def create_chatroom():
    access_token = request.headers.get("access_token")
    given_json = request.json
    tag_id = given_json['tag_id']
    chatroom_id = 'aaa'
    #########
    ## DB処理
    #########
    return jsonify({ 'chatroom_id': chatroom_id }), 200
