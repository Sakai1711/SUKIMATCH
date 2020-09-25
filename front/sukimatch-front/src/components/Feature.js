// Author Makoto Shiraishi - lp icons and styles

import React, { Component } from 'react';

class Feature extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='feature'>
        <div className='content icon'>
          {this.props.icon}
        </div>
        <div className='content content-body'>
          <div className='reason'>
            {`Feature ${this.props.number}`}
          </div>
          <div className='content-title'>
            <p className='bold'>
              {this.props.boldWord}
            </p>
            <p>
              {this.props.normalWord}
            </p>
          </div>
          <p className='sub-title'>
            {this.props.subTitle}
          </p>
        </div>
      </div>
    )
  };
}

export default Feature;