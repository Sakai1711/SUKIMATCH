import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


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
    <div className={classes.root}>
      {/* <Button className={classes.button}></Button> */}
      <Link to='/sign_in'>始める</Link>
    </div>
  );
}