import React, { Component } from 'react';
import axios from 'axios';
import { DB_INFO } from '../Database';

class Standings extends Component {
    
    constructor(props){
        super(props);
        this.state = {user: JSON.parse(localStorage.getItem('user')), standings:[]};

        this.getStandings = this.getStandings.bind(this);
        this.getRows = this.getRows.bind(this);
    }

    componentDidMount(){
        this.getStandings();
    }

    getStandings(){
        axios.get(DB_INFO.address + 'users/standings')
            .then((response) => {
                console.log(response.data);
                this.setState({standings:response.data});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getRows(){
        return this.state.standings.map((object, i) => {
            return(
                <tr key={i}>
                    <td>{object.displayname}</td>
                    <td>{object.wins}</td>
                    <td>{object.losses}</td>
                </tr>
                    )
            
        })
    }
    
    render() {
        return (
            <div>
                <h1 className="white-text" style={{width:'100%', textAlign:'center'}}>Standings</h1>
                <table style={{marginBottom:'0px'}} className="table table-dark table-condensed">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Wins</td>
                            <td>Losses</td>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {this.getRows()}
                    </tbody>
                </table>
            </div>
            
    );
  }
}

export default Standings;