import React from 'react';
import ChatBody from './ChatPage/ChatBody';
import ChatHeader from './ChatPage/ChatHeader';
import ChatInsert from './ChatPage/ChatInsert';


const Chat = () => {
  return (
    <div>
      <ChatHeader />
      <ChatBody />
      <ChatInsert />
    </div>
  )
};

export default Chat;