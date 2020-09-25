// Author Watanabe Mihane - html, system, styles
// Author Iimori MasaMichi - modified styles


import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { ApiClient } from '../utils/ApiClient';
import { withRouter } from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'firebase/firestore';
import { database } from '../firebase/firebase'

class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmpass: '',
      conPassError: false,
      showPassword: false,
      hasNameError: false,
      hasEmailError: false,
      hasPassError: false,
      createPasswordError: false,
      canSubmit: false,
      isSubmitted: false,
      enterLastCheck: false,
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

  matchPassword = () => {
    if (this.state.password !== this.state.confirmpass) {
      this.setState({ conPassError: true });
    } else {
      this.setState({ conPassError: false });
    }
  };

  isEmptyName = () => {
    if (this.state.username === '') {
      this.setState({ hasNameError: true });
    } else {
      this.setState({ hasNameError: false });
    }
  };

  isEmptyEmail = () => {
    if (this.state.email === '') {
      this.setState({ hasEmailError: true });
    } else {
      this.setState({ hasEmailError: false });
      this.setState({ firstBug: false });
    }
  };

  isEmptyPass = () => {
    if (this.state.password.length < 6) {
      this.setState({ hasPassError: true });
    } else {
      this.setState({ hasPassError: false });
    }
  };

  confirmSubmit = () => {
    if (this.state.hasEmailError || this.state.hasNameError || this.state.hasPassError || this.state.isSubmitted || this.state.conPassError || this.state.enterLastCheck || this.state.firstBug) {
      this.setState(() => ({ canSubmit: false }));
    } else {
      this.setState(() => ({ canSubmit: true }));
    }
    this.setState({ firstBug: false });
  };

  lastCheck = (e) => {
    this.isEmptyName();
    this.isEmptyEmail();
    this.isEmptyPass();
    this.matchPassword();
    this.setState({ enterLastCheck: !this.state.enterLastCheck });
    this.confirmSubmit();
  };

  handleClickisSubmitted = () => {
    this.setState({ isSubmitted: !this.state.isSubmitted });
    this.setState({ isLoading: true });

    ApiClient.post('/user', {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    }
    ).then(res => {
      sessionStorage.setItem('user_id', res.data.user_id);

      // firebaseのauthenticationに通ったらfirestoreに追加
      const userRef = database.collection("User").doc(res.data.user_id)
      userRef.set({
        email: this.state.email,
        name: this.state.username
      }).then(() => {
        this.setState({ isLoading: false });
        window.location.href = "/search"
      }).catch(err => {
      })

    }).catch(err => {
      this.setState({ invalidPassError: true });
      this.setState({ isLoading: false });
      this.setState({ isSubmitted: false })
      console.log('Invalid input.');
    });
  }

  render() {
    return (
      <Grid container alignItems="center" justify="center">
        <Grid item xs={8}>
          <div className='signup'>
            <Paper elevation={3} style={{ margin: 40, padding: 24, textAlign: 'center' }}>
              <Typography variant="h3" gutterBottom>
                Sign up
              </Typography>
              <br />
              <Box textAlign="center">
                <form className='form' noValidate autoComplete="off">
                  <TextField
                    required
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    onChange={this.handleChange('username')}
                    onBlur={this.isEmptyName}
                    style={{
                      width: '40%'
                    }}
                  />
                  {this.state.hasNameError ?
                    <FormHelperText id="component-error-text">
                      Name is required.
                  </FormHelperText> : <br />}
                  <br />
                  <TextField
                    id="outlined-basic"
                    type="email"
                    required
                    label="Email"
                    variant="outlined"
                    onChange={this.handleChange('email')}
                    onBlur={this.isEmptyEmail}
                    style={{
                      width: '40%'
                    }}
                  />
                  {this.state.hasEmailError ?
                    <FormHelperText id="component-error-text">
                      Email is required.
            </FormHelperText> : <br />}
                  <br />

                  {/* ---通常パスワード--- */}

                  <FormControl className="passform" variant="outlined" style={{ width: '40%' }}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={this.state.showPassword ? 'text' : 'password'}
                      onBlur={this.isEmptyPass}
                      value={this.state.password}
                      onChange={this.handleChange('password')}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                            edge="end"
                          >
                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={70}
                    />
                    {this.state.hasPassError ?
                      <FormHelperText id="component-error-text">
                        Password is required.
            </FormHelperText> : <br />}
                  </FormControl>
                  <br />

                  {/* ---確認用パスワードのエラー--- */}
                  {this.state.conPassError ?
                    <FormControl error className="passform" variant="outlined" style={{ width: '40%' }}>
                      <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        required
                        value={this.state.confirmpass}
                        onChange={this.handleChange('confirmpass')}
                        onBlur={this.matchPassword}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={this.handleClickShowPassword}
                              onMouseDown={this.handleMouseDownPassword}
                              edge="end"
                            >
                              {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={70}
                      />
                      <FormHelperText id="component-error-text">
                        Confirm password do not match.
                    </FormHelperText>
                    </FormControl> :
                    <FormControl className="passform" variant="outlined" style={{ width: '40%' }}>
                      <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        required
                        value={this.state.confirmpass}
                        onChange={this.handleChange('confirmpass')}
                        onBlur={this.matchPassword}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={this.handleClickShowPassword}
                              onMouseDown={this.handleMouseDownPassword}
                              edge="end"
                            >
                              {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={70}
                      />
                    </FormControl>
                  }
                </form>
                <br /><br />
                {this.state.isLoading ? <CircularProgress /> :
                  <>
                    <Checkbox
                      onChange={this.lastCheck}
                      name="checkedB"
                      color="primary"
                    />
                  Have you completed the input?
                  <br />
                    {this.state.canSubmit ?
                      <Button variant="contained" color="primary"
                        onChange={this.handleChange('isSubmitted')}
                        onClick={this.handleClickisSubmitted}
                      >
                        Sign up
                  </Button>
                      :
                      <Button variant="contained" disabled>
                        Sign up
                </Button>}
                  </>
                }

                <br /><br /><br />
              </Box>
            </Paper>
          </div>
        </Grid>
      </Grid>
    );
  }
}
export default withRouter(Signup)