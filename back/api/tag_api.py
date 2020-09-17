from flask import Flask, request, jsonify
import conf
app = conf.app

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

if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=5000)