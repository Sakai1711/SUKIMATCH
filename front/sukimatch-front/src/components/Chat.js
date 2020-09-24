import React, { useState, useEffect } from 'react';
import ChatBody from './ChatPage/ChatBody';
import ChatHeader from './ChatPage/ChatHeader';
import ChatInsert from './ChatPage/ChatInsert';
import io from 'socket.io-client';
import 'firebase/firestore';
import { database } from '../../firebase/firebase';

function Chat() {
  const [message, setMessage] = useState([]);
  const [status, setStatus] = useState(false);
  let socket = "";


  useEffect(() => {
    if(window.location.pathname === '/chat'){
      socket = io.connect('https://sukimatch-21753.herokuapp.com/chat');
      socket.on("connect", function() {
        console.log('connected');
        // socket.emit('connect_req',{user_id: sessionStorage.getItem('user_id'), chatroom_id: sessionStorage.getItem('chatroom_id')});
        console.log(socket);
    
        // socket.emit('ping_ping',{},function(){
        //   console.log('ping sent');
        // });
        socket.on('pong_pong',function(data) {
          setTimeout(delayFunction(data),7000);
        });
    
        socket.emit('connect_req',{user_id: sessionStorage.getItem('user_id'), chatroom_id: sessionStorage.getItem('chatroom_id')},function(){
          console.log('connect_req sent');
        });
      });
    }

  },[]);

  const sendHandler = (msgs) => {
    const msg = msgs;
    socket.emit('send_message_req',{user_id: sessionStorage.getItem('user_id'), chatroom_id: sessionStorage.getItem('chatroom_id'), content: msg, username: sessionStorage.getItem('username')},() => {
      console.log('send_message_req has been sent')
    });
    // user_id: sessionStorage.getItem('user_id'), 
    // chatroom_id: sessionStorage.getItem('chatroom_id'),
    console.log('=========================');
    console.log(msg);
    console.log('=========================');
  };

  socket.on('connect_res',(data) => {
    console.log("==================================");
    console.log(data);
    console.log("==================================");
    if(data.status==='ok'){
      setStatus(true);
    }else{
      setStatus(false);
    }
  });

  socket.on('send_message_res',function(data) {
    console.log("hogehogehoge");
    console.log(`${data.content} was recieved from ${data.username}`)
    const position = data.user_id === sessionStorage.getItem('user_id') ? 'right' : 'left' ;
    const classname = data.user_id === sessionStorage.getItem('user_id') ? 'my-chat' : 'other-chat' ;
    setMessage([...message,{position: position, type: 'text', text: data.content, date: new Date(),classname: classname }])
    console.log(message);
  });


  socket.on('disconnect_res',function(data) {
    if (data.status === 'ok') {

    }else{

    }
  });

  async function disconnectSocket() {
    await socket.emit('disconnect_req',{user_id: sessionStorage.getItem('user_id'), chatroom_id: sessionStorage.getItem('chatroom_id')},function() {
      socket.disconnect();
      console.log('disconnected complete');
    });
    // user_id: sessionStorage.getItem('user_id'), 
    // chatroom_id: sessionStorage.getItem('chatroom_id'),

    // Todo delete this line and implement it to on('disconnect_res')
    database.collection("Chatroom")
    .doc(sessionStorage.getItem('chatroom_id'))
    .delete()
    .then(function() {
      sessionStorage.removeItem('chatroom_id')
      window.location.href= "/search";
    });
  }

    const delayFunction = (d) => {
      console.log('pong_pong');
      console.log(`${d.time}`);
      socket.emit('ping_ping',{},function(){
        console.log('ping_sent_from_pong');
      });
    }



  return (
    <div className='chat-page'>
      <ChatHeader onDisconnectSocket={disconnectSocket}/>
      <ChatBody messages={message}/>
      <ChatInsert sendHandler={sendHandler}/>
    </div>
  );
}

export default Chat;
