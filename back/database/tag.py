import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from database import db
from model import Tag

def insert_tag(user_id, tag_name):
    tag_ref = db.collection(u'Tag')
    tag = Tag(user_id, tag_name)
    tag_ref.add(tag.to_dict())
    return

def get_tags(user_id):
    tags = []
    tag_ref = db.collection(u'Tag').where(u'user_id', u'==', user_id)
    tag_docs = tag_ref.stream()
    for tag_doc in tag_docs:
        tag_name = tag_doc.to_dict()['tag_name']
        tags.append({ 'tag_name': tag_name })
    return tags

def delete_tag(user_id, tag_name):
    tag_ref = db.collection(u'Tag').where(u'user_id', u'==', user_id).where(u'tag_name', u'==', tag_name)
    tag_docs = tag_ref.stream()
    for tag_doc in tag_docs:
        db.collection(u'Tag').document(tag_doc.id).delete()
    return

def exists(user_id, tag_name):
    exist_flag = 0
    tag_ref = db.collection(u'Tag').where(u'user_id', u'==', user_id).where(u'tag_name', u'==', tag_name)
    tag_docs = tag_ref.stream()
    for tag_doc in tag_docs:
        db.collection(u'Tag').document(tag_doc.id).delete()
        exist_flag = 1
    return exist_flag

