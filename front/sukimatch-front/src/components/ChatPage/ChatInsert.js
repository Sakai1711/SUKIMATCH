// Author Makoto Shiraishi

import React, { Component } from 'react';


class ChatInsert extends Component {
  constructor(){
    super();
    this.state = {
      value: "",
    }
    this.clickHandler = this.clickHandler.bind(this);
    this.inputValueHandler = this.inputValueHandler.bind(this);
  }

  clickHandler(e) {
    e.preventDefault();
    if (this.state.value === "") {
      return
    }else {
      document.getElementById('chat-input').value = "";
      this.props.sendHandler(this.state.value);
      this.setState(() => ({
        value: ""
      }));
    }
  }

  inputValueHandler(e) {
    const inputValue = e.target.value;
    this.setState(() => ({
      value: inputValue,
    }));
  }

  render() {
    return (
      <div className="chat-insert">
        <form className="chat-form">
          <input type="textarea" id="chat-input" className="chat-input" placeholder="text chat here..." onChange={this.inputValueHandler} />
          <button className="send-button" href="#" onClick={this.clickHandler}>send</button>
        </form>
      </div>
    )
  }
};

export default ChatInsert;