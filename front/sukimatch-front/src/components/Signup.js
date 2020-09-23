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

export default class Signup extends Component {
  
  constructor(props){
    super(props);
    this.state={
      username:'',
      email:'',
      password:'',
      confirmpass:'',
      conPassError: false,
      showPassword: false,
      hasNameError: false,
      hasEmailError: false,
      hasPassError: false,
      createPasswordError: false,
      canSubmit: false,
      isSubmitted: false,
      enterLastCheck: false,
      };
  }

  storageAvailable = (type) => {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage.length !== 0;
    }
  };

  handleChange = (prop) => (event) => {
    this.setState({[prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState({showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  matchPassword = () => {
    if (this.state.password !== this.state.confirmpass){
      this.setState({conPassError: true });
    }else{
      this.setState({conPassError: false });
    }
  };

  isEmptyName = () => {
    if(this.state.username === ''){
      this.setState({hasNameError: true});
    }else{
      this.setState({hasNameError: false});
    }
  };

  isEmptyEmail = () => {
    if(this.state.username === ''){
      this.setState({hasEmailError: true});
    }else{
      this.setState({hasEmailError: false});
    }
  };

  isEmptyPass = () => {
    if(this.state.username === ''){
      this.setState({hasPassError: true});
    }else{
      this.setState({hasPassError: false});
    }
  };

  confirmSubmit = () => {
    if (this.state.hasEmailError || this.state.hasNameError || this.state.hasPassError || this.state.isSubmitted || this.state.conPassError || this.state.lastCheck){
      this.setState({canSubmit: false});
    }else{
      this.setState({canSubmit: true});
    }
  };

  lastCheck = () => {
   // this.isEmptyName;
   // this.isEmptyEmail;
   //this.isEmptyPass;
   // this.matchPassword;
    this.setState({enterLastCheck: !this.state.enterLastCheck });
  };

  keepSession = () => {
    sessionStorage.setItem('key', 'value');
  };

  render(){
    return (
      <div className='signup'>
          <br /><br />
        <Typography className='title' variant="h2" gutterBottom>
          Signup
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
            />
            {this.state.hasEmailError ?
            <FormHelperText id="component-error-text">
              Email is required.
            </FormHelperText> : <br />}
            <br />

      {/* ---通常パスワード--- */}

          <FormControl className="passform" variant="outlined">
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

      {/* ---通常パスワードのエラー--- */}
      {/*
          <FormControl error className="passform" variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={this.state.showPassword ? 'text' : 'password'}
              required
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
            <FormHelperText id="component-error-text">A password is invalid.</FormHelperText>
          </FormControl>
          <br /><br />
            */}
      {/* ---確認用パスワードのエラー--- */}
      {this.state.conPassError ?
          <FormControl error className="passform" variant="outlined">
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
          </FormControl>:
          <FormControl className="passform" variant="outlined">
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
        <Checkbox
            onChange={this.lastCheck}
            onClick={this.confirmSubmit}
            onBlur={this.confirmSubmit}
            name="checkedB"
            color="primary"
          />
          Have you completed the input?
          <br />
          {this.state.canSubmit ?
          <Button variant="contained" color="primary" href="/user" 
                  onChange={this.handleChange('isSubmitted')}
                  >
              Sign up
          </Button>
          : 
          <Button variant="contained" disabled>
            Sign up
          </Button>}
          <br /><br /><br />
      </Box>
      </div>
    );
  }
}