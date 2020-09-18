import React, {Component} from 'react';
import ChatBody from './ChatPage/ChatBody';
import ChatHeader from './ChatPage/ChatHeader';
import ChatInsert from './ChatPage/ChatInsert';
 
class Chat extends Component {
  render() {
    return (
      <div className='chat-page'>
        <ChatHeader />
        <ChatBody />
        <ChatInsert />
      </div>
    );
  }
}


export default Chat;