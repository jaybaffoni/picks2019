import React, { Component } from 'react';
import { Button } from 'mdbreact';
import axios from 'axios';
import { DB_INFO } from '../Database';
import { Teams } from '../TeamData';

class PickRow extends Component {
    
    constructor(props){
        super(props);
        this.state = {user: props.user, obj: props.obj, team: 'none', pickid:null};
        this.getPick = this.getPick.bind(this);
        this.getColor = this.getColor.bind(this);
        this.makePick = this.makePick.bind(this);
        this.pickHome = this.pickHome.bind(this);
        this.pickAway = this.pickAway.bind(this);
        this.getPick();
    }
    
    getPick(){
        axios.get(DB_INFO.address + 'picks/' + this.state.user.id + '/' + this.state.obj.gameid)
          .then((response) => {
                if(response.data.team){
                    this.setState({team: response.data.team, pickid: response.data.id});   
                }
            })
          .catch((error) => {
            console.log(error);
          });
    }
    
    getColor(team){
        if(this.state.team === team){
            return 'success';
        } else {
            return 'danger';
        }
    }
    
    pickHome(){
        this.makePick(this.state.obj.home.abbr);
    }
    
    pickAway(){
        this.makePick(this.state.obj.away.abbr);
    }
    
    makePick(team){
        var data = {
            pickid: this.state.pickid,
            userid: this.state.user.id, 
            gameid: this.state.obj.gameid, 
            team: team
        };
        if(this.state.team === 'none'){
            axios.post(DB_INFO.address + 'picks', data)
                .then((response) => {
                    console.log(response);
                    this.setState({team: team});
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axios.put(DB_INFO.address + 'picks', data)
                .then((response) => {
                    console.log(response);
                    this.setState({team: team});
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        
    }
    
    render() {
        var home = this.state.obj.home.abbr;
        var away = this.state.obj.away.abbr;
        return (
            <div className="login-card col-md-6" style={{marginTop:20}}>
                <h4>{this.state.obj.gameid}</h4>
                <Button size="lg" block outline color={this.getColor(away)} onClick={this.pickAway}>{Teams[away].city} {Teams[away].mascot}</Button>
                <p style={{marginTop:10}}>@</p>
                <Button size="lg" block outline color={this.getColor(home)} onClick={this.pickHome} style={{marginTop:10}}>{Teams[home].city} {Teams[home].mascot}</Button>
            </div>
    );
  }
}

export default PickRow;