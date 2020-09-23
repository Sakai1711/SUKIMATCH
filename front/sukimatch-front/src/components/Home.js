import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Feature from './Feature';
import HowItWorks from './HowItWorks';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import SettingsIcon from '@material-ui/icons/Settings';
import ChatIcon from '@material-ui/icons/Chat';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  button: {
    marginRight: 'auto',
    marginLeft: 'auto'
  }

});

export default function Home() {
  const classes = useStyles();

  return (
    <div className='home'>
      <section id='header'>
        <p className='site-sub'> Have a wonderful encounter in 10 minutes.</p>
        <h1 className='site-title'>SUKIMATCH</h1>
        <p className='site-begin'>Let's encounter</p>
        <div className='buttons'>
          <a className='button' href='#about'>LEARN MORE</a>
          <Link className='button' to='/signin'>SIGN IN</Link>
        </div>
      </section>
      <section id='about'>
        <div className='aboutTitle'>
          <div className='titleMain'>
            What makes this site special?
          </div>
          <div className='titleSub'>
            There are 3 features to this site!!
          </div>
        </div>
        <Feature
          number={1}
          boldWord={'Automatic'}
          normalWord={' matching system'}
          subTitle={"This site will automatically match you with the people who has same interest, hobby, or life style. So you don't have to find the right person yourself! We will do that for you."}
          icon={<SettingsIcon className="icon-feature" />}
        />
        <Feature
          number={2}
          boldWord={'Number restriction'}
          normalWord={' in chat'}
          subTitle={'When you start a chat the number of people in the chat will be restricted below 4 people. So it will be easier for everyone to start a conversation, and get closer to one another.'}
          icon={<ChatIcon className="icon-feature" />}
        />
        <Feature
          number={3}
          boldWord={'Time limit'}
          normalWord={' of conversation'}
          subTitle={"There is a time limit in this chat room so you won't have to worry if the community you joined was right for you. If it wasn't than you won't have to speak with them again! Of course if you would like to bond with the members in chat room you can trade SNS acounts within the chatroom."}
          icon={<AccessAlarmIcon className="icon-feature" />}
        />
      </section>

      <div className='main-sub'></div>

      <section id='howItWorks'>
        <HowItWorks
        />
      </section>
    </div>
  );
}