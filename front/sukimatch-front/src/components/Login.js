import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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

export default function Login() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h1" gutterBottom>
        ログイン
      </Typography>
      <form className={classes.root} noValidate autoComplete="off">
        ユーザーネーム
        <TextField id="standard-basic" label="Standard" />
        パスワード
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
      </form>
      <Button className={classes.button}></Button>
      <Link to='/'>ログイン</Link>
    </div>
  );
}