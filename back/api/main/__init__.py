# Author Nagai Ryusei
from flask import Blueprint

app = Blueprint('app', __name__)

from . import chatroom_api, tag_api, user_api, socket