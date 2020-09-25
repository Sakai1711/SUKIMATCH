// @author Makoto Shiraishi - firebase connection, html
// @author Iimori MasaMichi - firebase connection

import React, { useState, useEffect } from 'react';
import ChatBody from './ChatPage/ChatBody';
import ChatHeader from './ChatPage/ChatHeader';
import ChatInsert from './ChatPage/ChatInsert';
import io from 'socket.io-client';
import 'firebase/firestore';
import { database } from '../firebase/firebase';

function Chat() {
  const [message, setMessage] = useState([]);
  const [status, setStatus] = useState(false);
  const [socket, setSocket] = useState('')
  const [isConnect, setIsConnect] = useState(false)


  useEffect(() => {
    if (window.location.pathname === '/chat') {
      // { transports: ['websocket'] }　つけたら動いた
      setSocket(io('https://sukimatch-21753.herokuapp.com/chat', { transports: ['websocket'] }))
    }
  }, []);

  const sendHandler = (msgs) => {
    const msg = msgs;
    socket.emit('send_message_req', { user_id: sessionStorage.getItem('user_id'), chatroom_id: sessionStorage.getItem('chatroom_id'), content: msg, username: sessionStorage.getItem('username') }, () => {
    });
  };

  async function disconnectSocket() {
    await socket.emit('disconnect_req', { user_id: sessionStorage.getItem('user_id'), chatroom_id: sessionStorage.getItem('chatroom_id') }, function () {
      socket.disconnect();
    });
    database.collection("Chatroom")
      .doc(sessionStorage.getItem('chatroom_id').toString())
      .delete()
      .then(function () {
        sessionStorage.removeItem('chatroom_id')
        window.location.href = "/search";
      });
  }
  if (socket) {
    if (!isConnect) {
      socket.on("connect", function () {
        setIsConnect(true)

        socket.emit('connect_req', { user_id: sessionStorage.getItem('user_id'), chatroom_id: sessionStorage.getItem('chatroom_id') }, function () {

        });

        socket.on('connect_res', (data) => {
          if (data.status === 'ok') {
            setStatus(true);
          } else {
            setStatus(false);
          }
        });

        socket.on('send_message_res', function (data) {
          const position = data.user_id === sessionStorage.getItem('user_id') ? 'right' : 'left';
          const classname = data.user_id === sessionStorage.getItem('user_id') ? 'my-chat' : 'other-chat';
          let newMessages = message
          newMessages.push({ position: position, type: 'text', text: data.content, date: new Date(), classname: classname, username: data.username, user_id: data.user_id })
          setMessage([])
          setMessage(newMessages)
        });
      });
    }

    socket.on('disconnect_res', function (data) {
      if (data.status === 'ok') {

      } else {

      }
    });
  }

  return (
    <div className='chat-page'>
      <ChatHeader onDisconnectSocket={disconnectSocket} />
      <ChatBody messages={message} />
      <ChatInsert sendHandler={sendHandler} />
    </div>
  );
}

export default Chat;
