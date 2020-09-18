import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
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

export default function Login() {
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
        Login
      </Typography>
      <br /><br />
      <Box textAlign="center">
        <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Name" />
        <br /><br />

        <FormControl className="passform">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

            <br /><br />
        <FormControl error className="passform-error" color="secondary">
          <InputLabel htmlFor="component-error">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText id="component-error-text">Error: Passwords do not match.</FormHelperText>
        </FormControl>

    </form>
    <br /><br /><br />
    <Button variant="contained" color="primary" href="/user">
        Login
    </Button>
    {/* space */}　{/* space */}
    <Button variant="contained" color="primary" href="/signup">
        Signup
    </Button>
    </Box>
    </div>
  );
}