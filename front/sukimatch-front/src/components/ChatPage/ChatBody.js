// Author Makoto Shiraishi

import React, { Component } from 'react';
import { MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';


export default function ChatBody(props) {
  return (
    <div className='chat-body'>
      {props.messages.map((message, index) => {
        return (
          <div className={message.classname} key={index}>
            {message.user_id !== sessionStorage.getItem('user_id') && <div className="name">{message.username}</div>}
            <MessageBox
              className={message.classname}
              position={message.position}
              type="text"
              text={message.text}
              date={message.date}
            />
          </div>
        )
      })}
    </div>
  );
}