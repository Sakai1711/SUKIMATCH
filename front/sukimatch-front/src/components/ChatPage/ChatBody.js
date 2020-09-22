import React, { Component } from 'react';
import { MessageList } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';


const messages = [
  {
    position: 'left',
    type: 'text',
    text: 'サンプルチャット',
    date: new Date('2020-03-12 13:00:00'),
  },
  {
    position: 'right',
    type: 'text',
    text: 'サンプルチャット2hogehogehogehoge hogehoge hoge hogeh ogehogehoge hoge',
    date: new Date('2020-03-12 14:00:00'),
  },
  {
    position: 'left',
    type: 'photo',
    data: {
      uri: 'img/human.svg',
      status: {
          click: false,
          loading: 0,
      }
    },
    date: new Date('2020-03-12 15:00:00'),
  }
];

class ChatBody extends Component {
    constructor() {
      super();
      this.sendHandler = this.sendHandler.bind(this);
    }

    sendHandler() {
      console.log('clicked!');
    }

    render() {
      return (
        <div className='chat-body'>
          <MessageList
            toBottomHeight={'100%'}
            lockable={true}
            dataSource={messages} 
          />

        </div>
      );
    }
};

export default ChatBody;