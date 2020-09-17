class Chatroom(object):
    def __init__(self, tag=[], user_ids=[]):
        #self.chatroom_id = chatroom_id
        self.tag = tag
        self.user_ids = user_ids

    def to_dict(self):
        return {'tag': self.tag, 'user_ids': self.user_ids}
    
    def __repr__(self):
        return (
            f'Chatroom(\
                tag={self.tag}, \
                user_ids={self.user_ids}\
            )'
        )

class User(object):
    def __init__(self, user_id, email, password, name, tags=[]):
        self.email = email
        self.password = password
        self.name = name
        self.tags = tags

    def to_dict(self):
        return {'email': self.email, 'password': self.password, 'name': self.name, 'tags': self.tags}
    
    def __repr__(self):
        return (
            f'User(\
                email={self.email}, \
                password={self.password}, \
                name={self.name}, \
                tags={self.tags}\
            )'
        )

class Tag(object):
    def __init__(self, tag_name):
        self.tag_name = tag_name

    def to_dict(self):
        return {'tag_name': self.tag_name}

    def __repr__(self):
        return (
            f'Tag(\
                tag_name={self.tag_name}\
            )'
        )
