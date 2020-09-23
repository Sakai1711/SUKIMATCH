import React, { Component } from 'react';

class Work extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='workBox'>
        {this.props.icon}
        <div className='workTitle'>
          {this.props.title}
        </div>
        <p className='workText'>
          {this.props.text}
        </p>
      </div>
    )
  };
}

export default Work;