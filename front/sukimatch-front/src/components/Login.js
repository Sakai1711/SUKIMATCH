import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { ApiClient } from '../utils/ApiClient';
import { withRouter } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isSubmitted: false,
      hasEmailError: false,
      hasPassError: false,
      showPassword: false,
      canSubmit: false,
      invalidPassError: false,
      firstBug: true,
      isLoading: false,
    };
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  handleClickisSubmitted = () => {
    this.setState({ isSubmitted: !this.state.isSubmitted });
    this.setState({ isLoading: true });
    ApiClient.post('/login', {
      email: this.state.email,
      password: this.state.password,
    }
    ).then(res => {
      sessionStorage.setItem('access_token', res.data.token);
      console.log('Error');
      this.props.history.push('/search')
    }).catch(err => {
      this.setState({ invalidPassError: true });
      console.log('Error!');
    });
  }

  isEmptyEmail = () => {
<<<<<<< HEAD
    if (this.state.email === '') {
      this.setState({ hasEmailError: true });
    } else {
      this.setState({ hasEmailError: false });
=======
    if(this.state.email === ''){
      this.setState({hasEmailError: true});
    }else{
      this.setState({hasEmailError: false});
      this.setState({firstBug: false});
>>>>>>> 3698e45289c8fe7862eeb442e1d64425a4f874bf
    }
  }

  isEmptyPass = () => {
    if (this.state.password === '') {
      this.setState({ hasPassError: true });
    } else {
      this.setState({ hasPassError: false });
    }
  }

  confirmSubmit = () => {
    this.isEmptyEmail();
    this.isEmptyPass();
    if (this.state.hasEmailError || this.state.hasPassError || this.state.isSubmitted || this.state.firstBug) {
      this.setState({ canSubmit: false });
    } else {
      this.setState({ canSubmit: true });
    }
    this.setState({ firstBug: false });
  };

  render() {
    return (
      <div className='login'>
        <Typography className='title' variant="h2" gutterBottom>
          Login
        </Typography>
        <Box textAlign="center">
          <form className='form' noValidate autoComplete="off" onBlur={this.confirmSubmit}>
            <TextField
              id="standard-basic"
              label="Email"
              aria-describedby="component-error-text"
              onChange={this.handleChange('email')}
              onBlur={this.isEmptyEmail}
            />
            {this.state.hasEmailError ?
              <FormHelperText id="component-error-text">
                Email is required.
            </FormHelperText> : <br />}
            <br />

            {this.state.invalidPassError ?
              <FormControl error className="passform-error" color="secondary">
                <InputLabel htmlFor="component-error">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText id="component-error-text">Error: Passwords do not match.</FormHelperText>
              </FormControl>
              :
              <FormControl className="passform">
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                  onBlur={this.isEmptyPass}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {this.state.hasPassError ?
                  <FormHelperText id="component-error-text">
                    Password is required.
            </FormHelperText> : <br />}
              </FormControl>
            }
          </form>

          <br /><br />
          {this.state.isLoading ? <CircularProgress /> :
            <>
              {this.state.canSubmit ?
                <Button className='button' variant="contained" color="primary"
                  onChange={this.handleChange('isSubmitted')}
                  onClick={this.handleClickisSubmitted}>
                  Login
      　        </Button>
                :
                <Button className='button' variant="contained" onClick={this.confirmSubmit}>
                  Have you completed the input?
      　        </Button>
              }

              <span>　　If you don't have account...　</span>
              <Button className='signup-button' variant="contained" color="primary" href="/signup">
                Signup
              </Button>
              <br /><br /><br />
            </>
          }
        </Box>
      </div>
    );
  }
}
export default withRouter(Login)