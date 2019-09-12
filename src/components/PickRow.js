import React, { Component } from 'react';
import { Button } from 'mdbreact';
import axios from 'axios';
import { DB_INFO } from '../Database';
import { Teams } from '../TeamData';

let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

class PickRow extends Component {
    
    constructor(props){
        super(props);
        this.state = {user: props.user, obj: props.obj, team: 'none', pickid:null};
        this.getPick = this.getPick.bind(this);
        this.getColor = this.getColor.bind(this);
        this.makePick = this.makePick.bind(this);
        this.pickHome = this.pickHome.bind(this);
        this.pickAway = this.pickAway.bind(this);
        this.throwError = this.throwError.bind(this);
    }

    componentDidMount(){
        this.getPick();
    }
    
    getPick(){
        axios.get(DB_INFO.address + 'ffpicks/' + this.state.user.id + '/' + this.state.obj.gameId)
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
        this.makePick(this.state.obj.homeTeam);
    }
    
    pickAway(){
        this.makePick(this.state.obj.awayTeam);
    }
    
    throwError(error){
        this.props.callback(error);
    }

    makePick(team){
        var data = {
            pickid: this.state.pickid,
            userid: this.state.user.id, 
            gameid: this.state.obj.gameId, 
            week: this.state.obj.gameWeek,
            date: this.state.obj.gameDate,
            time: this.state.obj.gameTimeET,
            team: team
        };
        if(this.state.team === 'none'){
            axios.post(DB_INFO.address + 'ffpicks', data)
                .then((response) => {
                    if(response.data.error){
                        this.throwError(response.data.error);
                    } else {
                        this.setState({team: team});
                    }
                    
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            axios.put(DB_INFO.address + 'ffpicks', data)
                .then((response) => {
                    if(response.data.error){
                        this.throwError(response.data.error);
                    } else {
                        this.setState({team: team});
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        
    }
    
    render() {
        var home = this.state.obj.homeTeam;
        var away = this.state.obj.awayTeam;

        var d = new Date(this.state.obj.gameDate);
        var gd = weekdays[d.getDay() + 1];

        return (
            <div className="login-card col-md-6" style={{marginTop:20}}>
                <h4>{gd} {this.state.obj.gameTimeET}</h4>
                <Button size="lg" block outline color={this.getColor(away)} onClick={this.pickAway}>
                    <div>
                        <p style={{fontSize:'12px',margin:'0px'}}>{Teams[away].city}</p>
                        <p style={{fontSize:'22px',margin:'0px'}}>{Teams[away].mascot}</p>
                    </div>
                </Button>
                <p style={{marginTop:10}}>@</p>
                <Button size="lg" block outline color={this.getColor(home)} onClick={this.pickHome} style={{marginTop:10}}>
                    <div>
                        <p style={{fontSize:'12px',margin:'0px'}}>{Teams[home].city}</p>
                        <p style={{fontSize:'22px',margin:'0px'}}>{Teams[home].mascot}</p>
                    </div>
                </Button>
            </div>
    );
  }
}

export default PickRow;