from conf import app, socketio, jsonify
from flask_socketio import Namespace, emit, join_room, disconnect

class MyNamespace(Namespace):
    def on_connect_req(self, data): # connect
        data = data.json
        access_token = data['access_token']
        chatroom_id = data['chatroom_id']
        # TODO: verify access_token
        join_room(chatroom_id)
        result = jsonify({'status': 'ok'})
        emit('connect_res', result)

    def on_send_message_req(self, data): # send message
        data = data.json
        access_token = data['access_token']
        user_id = data['user_id']
        chatroom_id = data['chatroom_id']
        content = data['content']
        # TODO: verify access_token and get username by user_id
        result = jsonify({'username': 'A', 'content': content})
        emit('send_message_res', result, room_id=chatroom_id)

    def on_disconnect_req(self, data): # disconnect
        data = data.json
        access_token = data['access_token']
        chatroom_id = data['chatroom_id']
        # TODO: delete this chatroom from database

socketio.on_namespace(MyNamespace('/chatrooms'))

#if __name__ == '__main__':
#    socketio.run(app, debug=True)
