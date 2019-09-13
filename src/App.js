import React, { Component } from 'react';
import './App.css';
import Auth from './components/Auth';
import Home from './components/Home';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Button, Navbar, NavbarBrand, NavbarToggler, Collapse, NavbarNav, NavItem, NavLink } from 'mdbreact';
import Standings from './components/Standings';
import Results from './components/Results';

class App extends Component {
  constructor() {
    super();
    this.state = ({
      user: JSON.parse(localStorage.getItem('user')),
      collapse: false,
      isWideEnough: false,
    });
    this.onClick = this.onClick.bind(this);
    this.signOut = this.signOut.bind(this);
    this.setUser = this.setUser.bind(this);

    console.log('user:');
    console.log(this.state.user);
  }

  onClick(){
      this.setState({
          collapse: !this.state.collapse,
      });
  }

  setUser(user){
      localStorage.setItem('user', JSON.stringify(user));
      this.setState({user:user});
  }

  signOut() {
      localStorage.removeItem('user');
      this.setState({user:null, collapse: false});
  }

  closeMenu = () => {
      this.setState({collapse:false});
  }

  render() {
    return (
      <div>
        {this.state.user ? (
        <BrowserRouter>
            <div>
            <Navbar fixed="top" color="primary-color" dark expand="md" >
                <NavbarBrand href="/">
                    <strong>Picks</strong>
                </NavbarBrand>
                { !this.state.isWideEnough && <NavbarToggler onClick = { this.onClick } />}
                <Collapse isOpen = { this.state.collapse } navbar>
                    <NavbarNav right>
                        <NavItem>
                            <NavLink onClick={this.closeMenu} to="/home">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={this.closeMenu} to="/results">Results</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={this.closeMenu} to="/standings">Standings</NavLink>
                        </NavItem>
                        <NavItem>
                            <Button size="sm" color="elegant" onClick={this.signOut}>Sign Out</Button>
                        </NavItem>
                    </NavbarNav>
                </Collapse>
            </Navbar>
            <div style={{paddingTop:"75px", paddingRight:'10px', paddingLeft:'10px'}}>
                <Switch>
                    <PrivateRoute path="/home" component={Home}/>
                    <PrivateRoute path="/results" component={Results}/>
                    <PrivateRoute path="/standings" component={Standings}/>
                    <Route path="*" render={() => <Redirect to="/home" />} />
                </Switch>
            </div>
          </div>
        </BrowserRouter>) :
        (<Auth callback={this.setUser}/>)}
        
      </div>
    )}
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('user')
      ? <Component {...props} {...rest}/>
      : <Redirect to={{
          pathname: '/signin'
        }} />
  )} />
)

 export default App;