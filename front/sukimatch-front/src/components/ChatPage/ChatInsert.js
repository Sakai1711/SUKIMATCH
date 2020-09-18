import React, { Component } from 'react';
import { Input, Button } from 'react-chat-elements';


class ChatInsert extends Component {
  render() {
    return (
      <div>
        <Input
          placeholder="Type here..."
          multiline={true}
          rightButtons={
              <Button
                  color='white'
                  backgroundColor='black'
                  text='Send'
                  onClick={this.sendHandler}
              />
          }
        />
      </div>
    )
  }
};

export default ChatInsert;