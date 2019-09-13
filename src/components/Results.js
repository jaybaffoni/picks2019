import React, { Component } from 'react';
import axios from 'axios';
import { DB_INFO } from '../Database';
import { Button } from 'mdbreact';

class Results extends Component {
    
    constructor(props){
        super(props);
        this.state = {user: JSON.parse(localStorage.getItem('user')), results:[], week:-1, update:true};

        this.getResults = this.getResults.bind(this);
        this.getRows = this.getRows.bind(this);
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this.getWeek = this.getWeek.bind(this);
    }

    componentDidMount(){
        this.getWeek();
    }

    getWeek(){
        axios.get(DB_INFO.address + 'ffgames')
            .then((response) => {
                this.setState({week:response.data.currentWeek, update:true}, this.getResults());
            })
            .catch((error) => {
                console.log(error);
            });
    }

    prev(){
        console.log('prev');
        var w = parseInt(this.state.week);
        if(w === 1) return;
        w = w - 1;
        this.setState({week:w, update:true});
    }

    next(){
        console.log('next');
        var w = parseInt(this.state.week);
        if(w === 17) return;
        w = w + 1;
        this.setState({week:w, update:true});
    }

    getResults(){
        if(this.state.week === -1) return;
        console.log('getting week ' + this.state.week);
        axios.get(DB_INFO.address + 'users/results/' + this.state.week)
            .then((response) => {
                console.log(response.data);
                this.setState({results:response.data, update:false});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getRows(){
        console.log('getting rows');
        return this.state.results.map((object, i) => {
            return(
                <tr key={object.displayname}>
                    <td>{object.displayname}</td>
                    <td style={{textAlign:'center'}}>{object.wins}</td>
                    <td style={{textAlign:'center'}}>{object.losses}</td>
                </tr>
                    )
            
        })
    }
    
    render() {
        console.log('render');
        if(this.state.update) this.getResults();
        return (
            <div>
                <div>
                    <Button size="sm" display="inline-block" color="primary" onClick={this.prev} style={{float:"left"}}>Prev</Button> 
                    <Button size="sm" display="inline-block" color="primary" onClick={this.next} style={{float:"right"}}>Next</Button> 
                </div>
                <h1 className="white-text" style={{width:'100%', textAlign:'center'}}>Week {this.state.week} Results</h1>
                <table style={{marginBottom:'0px'}} className="table table-dark table-condensed">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td style={{textAlign:'center'}}>Wins</td>
                            <td style={{textAlign:'center'}}>Losses</td>
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

export default Results;