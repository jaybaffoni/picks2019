import React, { Component } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.switchView = this.switchView.bind(this);
        this.state = {signin: true};
        
    }

    switchView(){
        this.setState({signin: !this.state.signin});
    }

    render() {
        return (
            <div className="App">
                <div style={{paddingTop:"25px"}}>
                {this.state.signin ?
                    <SignIn switch={this.switchView} callback={this.props.callback}/>
                :
                    <SignUp switch={this.switchView} callback={this.props.callback}/>
                }
                </div>

            </div>
        );
    }

}

export default Auth;