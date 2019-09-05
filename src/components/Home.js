import React, { Component } from 'react';
import axios from 'axios';
import PickRow from './PickRow';
import { DB_INFO } from '../Database';

class Home extends Component {
    
    constructor(props){
        super(props);
        this.state = {user: JSON.parse(localStorage.getItem('user')), games:[]};

        this.getGames = this.getGames.bind(this);
        this.getRows = this.getRows.bind(this);
    }

    componentDidMount(){
        this.getGames();
    }

    getGames(){
        axios.get(DB_INFO.address + 'games')
            .then((response) => {
                var gamesToAdd = [];
                var keys = Object.keys(response.data);
                for(var i = 0; i < keys.length; i++){
                    var jsonKey = keys[i];
                    var json = response.data[jsonKey];
                    json['gameid'] = jsonKey;
                    gamesToAdd.push(json);
                }
                this.setState({games:gamesToAdd});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getRows(){
        return this.state.games.map((object, i) => {
            return(
                    <PickRow key={i} obj={object} user={this.state.user}/>
                )
            
        })
    }
    
    render() {
        return (
            <div className="row">
                {this.getRows()}
            </div>
    );
  }
}

export default Home;