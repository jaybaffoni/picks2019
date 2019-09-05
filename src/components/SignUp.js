import React, { Component } from 'react';
import { Button, Input } from 'mdbreact';
import axios from 'axios';
import { DB_INFO } from '../Database';

class SignUp extends Component {
    
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.state = {
          email: '',
          displayname:'',
          password: '',
          confirm:''
        };
    }
    
    handleChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }

    signup(){

      if(this.state.password !== this.state.confirm){
          console.log("passwords don't match");
          return;
      }

      var data = {
          email: this.state.email,
          password: this.state.password,
          display: this.state.displayname
      }

    axios.post(DB_INFO.address + 'users', data)
    .then((response) => {
        if(response.data.error){
            console.log(response.data.error);
        } else {
            console.log(response.data);
            this.props.callback(response.data);
        }
    })
    .catch((error) => {
        console.log(error);
    });
    }

    render() {
        return (
            <div className="login-card">
                <h1>Picks</h1>
                    <p >Register a new account </p>
                    <form>
                      <div className="grey-text">
                        <Input label="Enter your email" group type="email" name="email" onChange={this.handleChange} validate error="wrong" success="right" value={this.state.email}/>
                        <Input label="Enter a display name" group  name="displayname" onChange={this.handleChange} validate value={this.state.displayname}/>
                        <Input label="Enter a password" group type="password" name="password" onChange={this.handleChange} validate value={this.state.password}/>
                        <Input label="Confirm your password" group type="password" name="confirm" onChange={this.handleChange} validate value={this.state.confirm}/>
                      </div>
                    {this.state.error && (<p className="error-text">{this.state.message}</p>)}
                    <Button block color="primary" onClick={this.signup}>Sign Up</Button>
                    </form>
                    <p style={{marginTop: 15}} >Already have an account? </p>
                    <Button size="sm" block color="elegant" onClick={this.props.switch}>Sign In</Button> 
                </div>
    );
  }
}

export default SignUp;