import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from model import User, Tag, Chatroom

cred = credentials.Certificate("RAKUTEN/sukimatch/TeamA/back/database/sukimatch-21753-firebase-adminsdk-pbpyr-b48f70c7fe.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

def update_user_ids(user_id, chatroom_id): # user_idsにuser_idを追加
    chatroom_ref = db.collection(u'Chatroom').document(chatroom_id)
    chatroom_ref.update({u'user_ids': firestore.ArrayUnion([user_id])})

def get_chatroom_id_by_user_id(user_id): # user_idでchatroom_idを取得
    chatroom_ref = db.collection(u'Chatroom').where(u'user_ids', u'array_contains', user_id).stream()
    for chatroom in chatroom_ref:
        return chatroom.id

def add_chatroom(user_id, tag_id, tag_name): # マッチング開始ボタンを押した時
    chatrooms = db.collection(u'Chatroom').where(u'tag_id', u'==', tag_id)
    num_of_chatrooms = len(list(chatrooms.get()))
    in_joined = False
    if num_of_chatrooms > 0:
        for room in chatrooms.stream():
            if len(room.to_dict()['user_ids']) < 4:
                update_user_ids(user_id, room.id)
                in_joined = True
                break
        return get_chatroom_id_by_user_id(user_id)

    if in_joined == False:
        chatroom = Chatroom(tag_id=tag_id, tag_name=tag_name, user_ids=[user_id])
        db.collection(u'Chatroom').add(chatroom.to_dict())
        return get_chatroom_id_by_user_id(user_id)

def check_chatroom(chatroom_id): # chatroom内の人数を数える
    chatroom_ref = db.collection(u'Chatroom').document(chatroom_id)
    user_ids = chatroom_ref.get().to_dict()['user_ids']
    return len(user_ids)
    
def delete_chatroom(chatroom_id): # chatroomのdocumentの削除
    db.collection(u'Chatroom').document(chatroom_id).delete()

#print(add_chatroom("user_id9", "ta", "tag1"))
#print(check_chatroom('5XPamFhqDkRBN87FxOi8'))
#delete_chatroom('pAIEbWrjEF6G64vdj0c4')

