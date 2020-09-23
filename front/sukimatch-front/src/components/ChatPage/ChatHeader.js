import React, { Component } from 'react';

class ChatHeader extends Component {

  constructor() {
    super();
    this.state = {
      time: 11000,
    };
    this.countDown = this.countDown.bind(this);
  }

  countDown(){
    this.setState((prevState) => ({
      time: prevState.time - 1
    }));
    if (this.state.time > -1) {
      setTimeout(this.countDown,1000);
    }else {
      window.alert('Time is done!');
    }
  } 

  componentDidMount() {
    setTimeout(this.countDown,1000)
  }

  render() {
    const remainderTime = this.state.time;
    return (
      <div className='chat-header'>
         {`remaining time is: ${parseInt(remainderTime/60)}min ${this.state.time === -1 ? 0 : parseInt(remainderTime%60)}sec`}
      </div>
    )
  }
};

export default ChatHeader;