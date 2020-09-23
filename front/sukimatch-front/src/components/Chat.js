import React, { Component, useState, useEffect } from 'react';
import ChatBody from './ChatPage/ChatBody';
import ChatHeader from './ChatPage/ChatHeader';
import ChatInsert from './ChatPage/ChatInsert';
import io from 'socket.io-client';


const socket = io.connect('https://sukimatch-21753.herokuapp.com/chat');

function Chat() {
  const [message, setMessage] = useState([]);
  const [status, setStatus] = useState(false);


  const sendHandler = (msg) => {
    const message = msg;
    socket.emit('send_message_req',{access_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlNjYzOGY4NDlkODVhNWVkMGQ1M2NkNDI1MzE0Y2Q1MGYwYjY1YWUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoidXBkYXRlbmFtZTUiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3VraW1hdGNoLTIxNzUzIiwiYXVkIjoic3VraW1hdGNoLTIxNzUzIiwiYXV0aF90aW1lIjoxNjAwODQ4OTAzLCJ1c2VyX2lkIjoiRU9JMHZSYWRGTGcyWUlVMFA1alEwWXBVQkd5MSIsInN1YiI6IkVPSTB2UmFkRkxnMllJVTBQNWpRMFlwVUJHeTEiLCJpYXQiOjE2MDA4NDg5MDMsImV4cCI6MTYwMDg1MjUwMywiZW1haWwiOiJ0ZXN0M0BleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0M0BleGFtcGxlLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.S3X_zq2zUgO4iO7OCfvSJkU5iZ5cTnynWYzVl696xc33IWN7hLBwJeFmZq80JoU4XRXdn4nDBwS2RUEeyOpErxtICgif2OcX7dS3x-emm2xj6YYgmEwz92ziJk0BdOpCVc_Ob_WjzqU4VmmK-rOR25_OMMK6ol36F8eDLN8dbC3OC1Jsf2FRdHE7kxDG69jiS0YVeUBM--QuA7c6xZVsNo04E-d_6o9ve8dxb0le_MXs6p1zkbyJwCG53eQjgdVjnTe3b1Q0kRpiD8uAwJ4exNfA_nKNXsJVusP1QbdbeglnefDa4dkrQDDGIDOnNg5bnHGCeStvrt6x4QectseQFg", chatroom_id:"culxeiDi0XNmVkFIiI6h",content: message},() => {
      console.log('send_message_req has been sent')
    });
    // access_token: sessionStorage.getItem('access_token'), 
    // chatroom_id: sessionStorage.getItem('chatroom_id'),
    console.log('=========================');
    console.log(message);
    console.log('=========================');
  };




  socket.on("connect", () => {
    console.log('connected');
    // socket.emit('connect_req',{access_token: sessionStorage.getItem('access_token'), chatroom_id: sessionStorage.getItem('chatroom_id')});
    console.log(socket);

    socket.emit('ping_ping',{},()=>{
      console.log('ping sent');
    });

    socket.emit('connect_req',{access_token:"eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlNjYzOGY4NDlkODVhNWVkMGQ1M2NkNDI1MzE0Y2Q1MGYwYjY1YWUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoidXBkYXRlbmFtZTUiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3VraW1hdGNoLTIxNzUzIiwiYXVkIjoic3VraW1hdGNoLTIxNzUzIiwiYXV0aF90aW1lIjoxNjAwODQ4OTAzLCJ1c2VyX2lkIjoiRU9JMHZSYWRGTGcyWUlVMFA1alEwWXBVQkd5MSIsInN1YiI6IkVPSTB2UmFkRkxnMllJVTBQNWpRMFlwVUJHeTEiLCJpYXQiOjE2MDA4NDg5MDMsImV4cCI6MTYwMDg1MjUwMywiZW1haWwiOiJ0ZXN0M0BleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0M0BleGFtcGxlLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.S3X_zq2zUgO4iO7OCfvSJkU5iZ5cTnynWYzVl696xc33IWN7hLBwJeFmZq80JoU4XRXdn4nDBwS2RUEeyOpErxtICgif2OcX7dS3x-emm2xj6YYgmEwz92ziJk0BdOpCVc_Ob_WjzqU4VmmK-rOR25_OMMK6ol36F8eDLN8dbC3OC1Jsf2FRdHE7kxDG69jiS0YVeUBM--QuA7c6xZVsNo04E-d_6o9ve8dxb0le_MXs6p1zkbyJwCG53eQjgdVjnTe3b1Q0kRpiD8uAwJ4exNfA_nKNXsJVusP1QbdbeglnefDa4dkrQDDGIDOnNg5bnHGCeStvrt6x4QectseQFg",chatroom_id:"culxeiDi0XNmVkFIiI6h"},()=>{
      console.log('connect_req sent');
    });


    socket.on('pong_pong',()=>{
      console.log('pong_pong');
      socket.emit('ping_ping',{},()=>{
        console.log('ping_sent_from_pong');
      })
    })

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

    socket.on('send_message_res',(data) => {
      console.log("hogehogehoge");
      console.log(`${data.content} was recieved from ${data.username}`)
      const position = data.access_token === sessionStorage.getItem('access_token') ? 'right' : 'left' ;
      setMessage([...message,{position: position, type: 'text', text: data.content, date: new Date(), }])
    });
    
  })





  return (
    <div className='chat-page'>
      <ChatHeader />
      <ChatBody messages={message}/>
      <ChatInsert sendHandler={sendHandler}/>
    </div>
  );
}

export default Chat;















// class Chat extends Component {

//   constructor(){
//     super();
//     this.socket = "";
//     this.state = {
//       messages: [],
//       status: false,
//     }
//     this.sendHandler = this.sendHandler.bind(this);
//   }

//   componentDidMount() {
//     this.socket = io.connect("https://sukimatch-21753.herokuapp.com/chat");

//     this.socket.on('connect',() => {
//       console.log('hoge');
//       // this.socket.emit('connect_req',{access_token: sessionStorage.getItem('access_token'), chatroom_id: sessionStorage.getItem('chatroom_id')});
//       console.log(this.socket);
//       this.socket.emit('connect_req',{access_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlNjYzOGY4NDlkODVhNWVkMGQ1M2NkNDI1MzE0Y2Q1MGYwYjY1YWUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoidXBkYXRlbmFtZTUiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3VraW1hdGNoLTIxNzUzIiwiYXVkIjoic3VraW1hdGNoLTIxNzUzIiwiYXV0aF90aW1lIjoxNjAwODQ0MjY3LCJ1c2VyX2lkIjoiRU9JMHZSYWRGTGcyWUlVMFA1alEwWXBVQkd5MSIsInN1YiI6IkVPSTB2UmFkRkxnMllJVTBQNWpRMFlwVUJHeTEiLCJpYXQiOjE2MDA4NDQyNjcsImV4cCI6MTYwMDg0Nzg2NywiZW1haWwiOiJ0ZXN0M0BleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0M0BleGFtcGxlLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.OuuhkBoahIr_JGMx93_gFxyW7IM9eqWZWOaNsO3qHitKF1CIClmcTTX8uf8uK8tiTu5M_jo61R8oijprHMm3vh1mWGCa8jeyWWYIA0gjpRwnZ_xhE4CBs4QcEGMP6sKa3dzNXbFD26XIlFsZtmglFJoBZA8LUv1lOMN5oKeejyHNEoVgS0SaiFx_4RzITi0wbcLcsHKA7_3ISypxhc_-vxbdEyXpgCKYPnfsrpLpp_yu8Y50IE3HNpnvY5bAMrhJ4SYPNsWnT5h2UgqrurZpKguqRiXbBu-oJVPJn4X06Z-6NN7IT2YSqvIUslrGzHrzvLMRNjOHGcQohVwvVj6tEQ", chatroom_id: "culxeiDi0XNmVkFIiI6h"},()=>{
//         console.log('connect_req sent');
//       });

//       this.socket.on('connect_res',(data) => {
//         console.log("==================================");
//         console.log(data);
//         console.log("==================================");
//         if(data.status==='ok'){
//           this.setState(() => ({
//             status: true,
//           }))
//         }else{
//           this.setState(() => ({
//             status: false,
//           }))
//         }
//       });
      // this.socket.on('send_message_res',(data) => {
      //   console.log("hogehogehoge");
      //   console.log(`${data.content} was recieved from ${data.username}`)
      //   const position = data.access_token === sessionStorage.getItem('access_token') ? 'right' : 'left' ;
      //   this.setState((prevState) => ({
      //     messages: prevState.messages.concat({position: position, type: 'text', text: data.content, date: new Date(),})
      //   }))
      // });
    
//     });

//   }

//   sendHandler(msg) {
//     const message = msg;
//     this.socket.emit('send_message_req',{access_token: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlNjYzOGY4NDlkODVhNWVkMGQ1M2NkNDI1MzE0Y2Q1MGYwYjY1YWUiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoidXBkYXRlbmFtZTUiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3VraW1hdGNoLTIxNzUzIiwiYXVkIjoic3VraW1hdGNoLTIxNzUzIiwiYXV0aF90aW1lIjoxNjAwODQ0MjY3LCJ1c2VyX2lkIjoiRU9JMHZSYWRGTGcyWUlVMFA1alEwWXBVQkd5MSIsInN1YiI6IkVPSTB2UmFkRkxnMllJVTBQNWpRMFlwVUJHeTEiLCJpYXQiOjE2MDA4NDQyNjcsImV4cCI6MTYwMDg0Nzg2NywiZW1haWwiOiJ0ZXN0M0BleGFtcGxlLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ0ZXN0M0BleGFtcGxlLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.OuuhkBoahIr_JGMx93_gFxyW7IM9eqWZWOaNsO3qHitKF1CIClmcTTX8uf8uK8tiTu5M_jo61R8oijprHMm3vh1mWGCa8jeyWWYIA0gjpRwnZ_xhE4CBs4QcEGMP6sKa3dzNXbFD26XIlFsZtmglFJoBZA8LUv1lOMN5oKeejyHNEoVgS0SaiFx_4RzITi0wbcLcsHKA7_3ISypxhc_-vxbdEyXpgCKYPnfsrpLpp_yu8Y50IE3HNpnvY5bAMrhJ4SYPNsWnT5h2UgqrurZpKguqRiXbBu-oJVPJn4X06Z-6NN7IT2YSqvIUslrGzHrzvLMRNjOHGcQohVwvVj6tEQ", chatroom_id: "culxeiDi0XNmVkFIiI6h",content: message})
//     // access_token: sessionStorage.getItem('access_token'), 
//     // chatroom_id: sessionStorage.getItem('chatroom_id'),
//     console.log('=========================');
//     console.log(message);
//     console.log('=========================');
//   }
//   render() {
//     return (
//       <div className='chat-page'>
//         <ChatHeader />
//         <ChatBody messages={this.state.messages}/>
//         <ChatInsert sendHandler={this.sendHandler}/>
//       </div>
//     );
//   }
// }


// export default Chat;