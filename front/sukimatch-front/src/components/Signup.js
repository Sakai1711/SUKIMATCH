import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


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

export default function Signup() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <div className={classes.root}>
        <br /><br />
      <Typography variant="h2" gutterBottom>
        Signup
      </Typography>
      <br /><br />
      <Box textAlign="center">
        <form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Name" variant="outlined" />
        <br /><br />
        <TextField id="outlined-basic" label="Email" variant="outlined" />
        <br /><br />

    {/* ---通常パスワード--- */}

        <FormControl className="passform" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.normalpass}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        <br /><br />

    {/* ---通常パスワードのエラー--- */}

        <FormControl error className="passform" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.normalpass}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
          <FormHelperText id="component-error-text">A password is invalid.</FormHelperText>
        </FormControl>
        <br /><br />

    {/* ---確認用パスワード--- */}

        <FormControl className="passform" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.confirmpass}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        <br /><br />

    {/* ---確認用パスワードのエラー--- */}

        <FormControl error className="passform" variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.confirmpass}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
          <FormHelperText id="component-error-text">Confirm password do not match.</FormHelperText>
        </FormControl>
      </form>
      <br /><br /><br />
        <Button variant="contained" color="primary" href="/user">
            Sign up
        </Button>
     </Box>
    </div>
  );
}