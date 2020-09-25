// Author Watanabe Mihane - html, system, styles
// Author Iimori MasaMichi - modified styles

import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Box, Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Paper from '@material-ui/core/Paper';
import { ApiClient } from '../utils/ApiClient';
import { withRouter } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';
import OutlinedInput from '@material-ui/core/OutlinedInput';


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
      sessionStorage.setItem('user_id', res.data.user_id);
      this.setState({ isLoading: false });
      // this.props.history.push('/search')
      window.location.href = '/search';
    }).catch(err => {
      this.setState({ isSubmitted: false });
      this.setState({ invalidPassError: true });
      this.setState({ isLoading: false });
    });
  }

  isEmptyEmail = () => {
    if (this.state.email === '') {
      this.setState({ hasEmailError: true });
    } else {
      this.setState({ hasEmailError: false });
      this.setState({ firstBug: false });
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
      <Grid container alignItems="center" justify="center">
        <Grid item xs={8}>
          <div className='login'>
            <Paper elevation={3} style={{ margin: 40, padding: 24, textAlign: 'center' }}>
              <Typography variant="h3" gutterBottom>
                Log in
              </Typography>
              <Box textAlign="center">
                <form className='form' noValidate autoComplete="off" onBlur={this.confirmSubmit}>
                  <TextField
                    id="standard-basic"
                    label="Email"
                    aria-describedby="component-error-text"
                    onChange={this.handleChange('email')}
                    onBlur={this.isEmptyEmail}
                    variant='outlined'
                    style={{
                      width: '40%'
                    }}
                  />
                  {this.state.hasEmailError ?
                    <FormHelperText id="component-error-text">
                      Email is required.
                  </FormHelperText> : <br />}
                  <br />

                  {this.state.invalidPassError ?
                    <FormControl error className="passform-error" color="secondary" variant='outlined' style={{ width: '40%' }}>
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
                    <FormControl className="passform" variant='outlined' style={{ width: '40%' }}>
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
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
                    <div style={{ display: "flex", alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'wrap' }}>

                      <Typography variant='h6' color='textSecondary'>　　If you don't have account...　</Typography>
                      <Button className='signup-button' variant="contained" color="primary" href="/signup">
                        Signup
                      </Button>
                    </div>
                    <br /><br /><br />
                  </>
                }
              </Box>
            </Paper>
          </div>
        </Grid>
      </Grid>

    );
  }
}
export default withRouter(Login)