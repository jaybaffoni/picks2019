import React, { Component } from 'react';
import { Button, Input } from 'mdbreact';
import axios from 'axios';
import { DB_INFO } from '../Database';

class SignIn extends Component {
    
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            email: '',
            password: '',
        };        
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    login() {
        var data = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post(DB_INFO.address + 'users/validate', data)
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
                <p >Sign in to your account </p>
                <form>
                    <div className="grey-text">
                        <Input label="Enter email" group type="email" name="email" onChange={this.handleChange} validate error="wrong" success="right" value={this.state.user_name}/>
                        <Input label="Enter password" group type="password" name="password" onChange={this.handleChange} validate value={this.state.password}/>
                    </div>
                    <Button block color="primary" onClick={this.login}>Sign In</Button>
                </form>
                <p style={{marginTop: 15}} >Don't have an account?</p>
                <Button size="sm" block color="elegant" onClick={this.props.switch}>Sign Up</Button> 
            </div>
    );
  }
}

export default SignIn;