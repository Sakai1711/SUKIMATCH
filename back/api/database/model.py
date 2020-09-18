class User(object):
    def __init__(self, email, password, name, tags=[]):
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