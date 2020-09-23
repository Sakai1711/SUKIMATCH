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
        access_token = data['access_token']
        chatroom_id = data['chatroom_id']
        if verify(access_token) != "":
            join_room(chatroom_id)
            emit('connect_res', {'status': 'ok'})
        else:
            emit('connect_res', {'status': 'incorrect access token'})

    def on_send_message_req(self, data): # send message
        access_token = data['access_token']
        chatroom_id = data['chatroom_id']
        content = data['content']
        user_id = verify(access_token)
        if user_id != "":
            username, _, _ = load_mypage(user_id) # TODO: no tag
            result = {'username': username, 'content': content}
            emit('send_message_res', result, room_id=chatroom_id)
        else:
            emit('send_message_res', {'status': 'incorrect access token'})

    def on_disconnect_req(self, data): # disconnect
        access_token = data['access_token']
        chatroom_id = data['chatroom_id']
        user_id = verify(access_token)
        if user_id != "":
            delete_chatroom(chatroom_id)
        # TODO: 4人から

socketio.on_namespace(MyNamespace('/chat'))

