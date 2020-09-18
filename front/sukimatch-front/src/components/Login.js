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
  Button: {
    marginRight: 'auto',
    marginLeft: 'auto'
  }

});

export default function Login() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2" gutterBottom>
        ログイン
      </Typography>
      <br />
      <form className={classes.root} noValidate autoComplete="off">
        ユーザーネーム
      <TextField id="standard-basic" label="Standard" />
      <br />
        パスワード
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        </form>
        <br /><br />
        <Button variant="contained" color="primary" href="/">
            ログイン
        </Button>
    </div>
  );
}