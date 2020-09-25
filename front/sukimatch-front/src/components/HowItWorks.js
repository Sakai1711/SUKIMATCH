// Author Makoto Shiraishi

import React, { Component } from 'react';
import Work from './Work.js';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import MouseIcon from '@material-ui/icons/Mouse';
import ForumIcon from '@material-ui/icons/Forum';

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
          <Work title={'Choose tag'} text={'Choose a topic that you would like to talk about.'} icon={<LocalOfferIcon className='icon-work' />} />
          <Work title={'Click match'} text={'Click the match button and we will automatically match you with people who would like to talk about the same topic'} icon={<MouseIcon className='icon-work' />} />
          <Work title={'Start conversation!'} text={"Start talking! If you didn't think the person was right for you, no worries! The conversation will end in 10 minutes. If you would like to talk more, than trade SNS accounts!"} icon={<ForumIcon className='icon-work' />} />
        </div>
      </div>
    )
  };
}

export default HowItWorks;