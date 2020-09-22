import React, { Component } from 'react';
import Work from './Work.js'; 

class HowItWorks extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className='works'>
        <h2 className='titleMain'>How it works</h2>
        <h2 className='titleSub'>Just 3 simple steps</h2>
        <div className='works-wrapper'>
          <Work title={'Choose tag'} text={'Choose a topic that you would like to talk about.'} />
          <Work title={'Click match'} text={'Click the match button and we will automatically match you with people who would like to talk about the same topic'} />
          <Work title={'Start conversation!'} text={"Start talking! If you didn't think the person was right for you, no worries! The conversation will end in 10 minutes. If you would like to talk more, than trade SNS accounts!"} />
        </div>
      </div>
    )
  };
}

export default HowItWorks;