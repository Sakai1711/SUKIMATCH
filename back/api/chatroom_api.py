from flask import Flask, request, jsonify
import conf
app = conf.app

@app.route("/chatrooms/search/<int:chatroom_id>", methods=["GET"])
def search_chatroom_id(chatroom_id):
    print(chatroom_id)
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
    chatroom_id = 0
    #########
    ## DB処理
    #########
    return jsonify({ 'chatroom_id': chatroom_id }), 200

if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=5000)