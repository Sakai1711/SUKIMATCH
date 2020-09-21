from . import app
from .. import socketio
from flask import jsonify
from flask_socketio import Namespace, emit, join_room, disconnect
import sys
sys.path.append('../')
from database.user import load_mypage
from database.chatroom import delete_chatroom
from auth.auth import verify

class MyNamespace(Namespace):
    def on_connect_req(self, data): # connect
        data = data.json
        access_token = data['access_token']
        chatroom_id = data['chatroom_id']
        if verify(access_token) != "":
            join_room(chatroom_id)
            result = jsonify({'status': 'ok'})
            emit('connect_res', result)

        # TODO: write else response

    def on_send_message_req(self, data): # send message
        data = data.json
        access_token = data['access_token']
        chatroom_id = data['chatroom_id']
        content = data['content']
        user_id = verify(access_token)
        if user_id != "":
            username, _, _ = load_mypage(user_id)
            result = jsonify({'username': username, 'content': content})
            emit('send_message_res', result, room_id=chatroom_id)

    def on_disconnect_req(self, data): # disconnect
        data = data.json
        access_token = data['access_token']
        chatroom_id = data['chatroom_id']
        user_id = verify(access_token)
        if user_id != "":
            delete_chatroom(chatroom_id)

socketio.on_namespace(MyNamespace('/chatrooms'))

