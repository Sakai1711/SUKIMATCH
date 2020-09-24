import React, { Component } from 'react';
import { MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

class ChatBody extends Component {

    render() {
      return (
        <div className='chat-body'>
          {this.props.messages.map((message) => {
            return (
              <div className={message.classname}>
                <MessageBox
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
};

export default ChatBody;