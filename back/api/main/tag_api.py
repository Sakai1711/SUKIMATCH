from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from . import app
from model import Tag

cred = credentials.Certificate('./sukimatch-21753-firebase-adminsdk-pbpyr-71cf5581f2.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

@app.route("/tag", methods=["POST"])
def insert_tag():
    access_token = request.headers.get("access_token")
    given_json = request.json
    tag_name = given_json['name']
    unique_flag = 1

    user_id = 0
    
    tag_ref = db.collection(u'Tag')
    tag_docs = tag_ref.stream()
    for tag_doc in tag_docs:
        tag_dict = tag_doc.to_dict()
        user_id_in_db = tag_dict['user_id']
        tag_in_db = tag_dict['tag_name']
        if user_id == user_id_in_db and tag_name == tag_in_db:
            unique_flag = 0
            break
    
    if unique_flag == 0:
        return jsonify({}), 400
    tag = Tag(user_id, tag_name)
    tag_ref.add(tag.to_dict())
    return jsonify({}), 204

@app.route("/tags", methods=["GET"])
def get_tags():
    access_token = request.headers.get("access_token")

    user_id = 0

    tags = []
    tag_ref = db.collection(u'Tag')
    tag_docs = tag_ref.stream()
    for tag_doc in tag_docs:
        tag_dict = tag_doc.to_dict()
        user_id_in_db = tag_dict['user_id']
        tag_in_db = tag_dict['tag_name']
        if user_id == user_id_in_db:
            tags.append({ 'tag_name': tag_in_db })
    
    return jsonify({ 'tags': tags }), 200

@app.route("/tag/delete", methods=["POST"])
def delete_tag():
    access_token = request.headers.get("access_token")
    given_json = request.json
    tag_name = given_json['name']
    exist_flag = 0

    user_id = 1

    tag_ref = db.collection(u'Tag').where(u'user_id', u'==', user_id)
    tag_docs = tag_ref.stream()
    for tag_doc in tag_docs:
        tag_in_db = tag_doc.to_dict()['tag_name']
        if tag_name == tag_in_db:
            db.collection(u'Tag').document(tag_doc.id).delete()
            exist_flag = 1


    if exist_flag == 1:
        return jsonify({}), 200
    else:
        return jsonify({}), 404

if __name__ == "__main__":
    app.run(debug=False, host='0.0.0.0', port=5000)