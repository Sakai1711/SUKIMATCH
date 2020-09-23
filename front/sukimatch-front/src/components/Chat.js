import React, { useState, useEffect } from 'react';
import ChatBody from './ChatPage/ChatBody';
import ChatHeader from './ChatPage/ChatHeader';
import ChatInsert from './ChatPage/ChatInsert';
import io from 'socket.io-client';


const socket = io.connect('https://sukimatch-21753.herokuapp.com/chat');

function Chat() {
  const [message, setMessage] = useState([]);
  const [status, setStatus] = useState(false);


  const sendHandler = (msgs) => {
    const msg = msgs;
    socket.emit('send_message_req',{access_token: sessionStorage.getItem('access_token'), chatroom_id:"culxeiDi0XNmVkFIiI6h", content: msg, username: "makoto"},() => {
      console.log('send_message_req has been sent')
    });
    // access_token: sessionStorage.getItem('access_token'), 
    // chatroom_id: sessionStorage.getItem('chatroom_id'),
    console.log('=========================');
    console.log(msg);
    console.log('=========================');
  };

  useEffect(() => {
    socket.on("connect", function() {
      console.log('connected');
      // socket.emit('connect_req',{access_token: sessionStorage.getItem('access_token'), chatroom_id: sessionStorage.getItem('chatroom_id')});
      console.log(socket);
  
      // socket.emit('ping_ping',{},function(){
      //   console.log('ping sent');
      // });
      socket.on('pong_pong',function(data) {
        setTimeout(delayFunction(data),7000);
      });
  
      socket.emit('connect_req',{access_token: sessionStorage.getItem('access_token'), chatroom_id:"culxeiDi0XNmVkFIiI6h"},function(){
        console.log('connect_req sent');
      });
    });


  },[]);

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
    const position = data.access_token === sessionStorage.getItem('access_token') ? 'right' : 'left' ;
    setMessage([...message,{position: position, type: 'text', text: data.content, date: new Date() }])
    console.log(message);
  });


  socket.on('disconnect_res',function(data) {
    if (data.status === 'ok') {

    }else{

    }
  });

  async function disconnectSocket() {
    await socket.emit('disconnect_req',{access_token: sessionStorage.getItem('access_token'), chatroom_id:"culxeiDi0XNmVkFIiI6h"},function() {
      socket.disconnect();
      console.log('disconnected complete');
    });
    // access_token: sessionStorage.getItem('access_token'), 
    // chatroom_id: sessionStorage.getItem('chatroom_id'),

    // Todo delete this line and implement it to on('disconnect_res')
    window.location.href= "/search";
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
