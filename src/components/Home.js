import React, { Component } from 'react';
import axios from 'axios';
import PickRow from './PickRow';
import { DB_INFO } from '../Database';
import { Button, MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class Home extends Component {
    
    constructor(props){
        super(props);
        this.state = {user: JSON.parse(localStorage.getItem('user')), games:{
            'week1':[], 'week2':[], 'week3':[], 'week4':[], 'week5':[], 'week6':[], 'week7':[], 'week8':[], 'week9':[], 
            'week10':[], 'week11':[], 'week12':[], 'week13':[], 'week14':[], 'week15':[], 'week16':[], 'week17':[]
        }, week: 1, modal:false, error:''};

        this.getGames = this.getGames.bind(this);
        this.getRows = this.getRows.bind(this);
        this.prev = this.prev.bind(this);
        this.next = this.next.bind(this);
        this.pickError = this.pickError.bind(this);
        this.getWeek = this.getWeek.bind(this);
    }

    componentDidMount(){
        this.getWeek();
    }

    getWeek(){
        axios.get(DB_INFO.address + 'ffgames/apigames')
            .then((response) => {
                // console.log(response.data);
                this.setState({week:response.data.currentWeek}, this.getGames());
            })
            .catch((error) => {
                console.log(error);
            });
    }

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }

    pickError(error){
        this.setState({error:error, modal:true});
    }

    getGames(){
        var url = DB_INFO.address + 'ffgames/user/' + this.state.user.id;
        // console.log(url);
        axios.get(url)
            .then((response) => {
                var newGames = {};
                for(var i = 1; i < 18; i++){
                    newGames['week' + i] = [];
                }
                for(var j = 0; j < response.data.length; j++){
                    newGames['week' + response.data[j].week].push(response.data[j]);
                }

                this.setState({games:newGames});
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getRows(){
        var weekString = 'week' + this.state.week;
        var gameMap = this.state.games[weekString];
        return gameMap.map((object, i) => {
            return(
                    <PickRow key={object.id} obj={object} user={this.state.user} callback={this.pickError}/>
                )
            
        })
    }

    prev(){
        var w = parseInt(this.state.week);
        if(w === 1) return;
        w = w - 1;
        this.setState({week:w});
    }

    next(){
        var w = parseInt(this.state.week);
        if(w === 17) return;
        w = w + 1;
        this.setState({week:w});
    }
    
    render() {
        return (
            <div>
                <MDBContainer>
                  <MDBModal isOpen={this.state.modal} toggle={this.toggle}    >
                    <MDBModalHeader toggle={this.toggle}>Pick Error</MDBModalHeader>
                    <MDBModalBody>
                      {this.state.error}
                    </MDBModalBody>
                    <MDBModalFooter>
                      <MDBBtn color="primary" onClick={this.toggle}>Close</MDBBtn>
                    </MDBModalFooter>
                  </MDBModal>
                </MDBContainer>
                <div>
                    <Button size="sm" display="inline-block" color="primary" onClick={this.prev} style={{float:"left"}}>Prev</Button> 
                    <Button size="sm" display="inline-block" color="primary" onClick={this.next} style={{float:"right"}}>Next</Button> 
                </div>
                <h1 className="white-text" style={{width:'100%', textAlign:'center'}}>Week: {this.state.week}</h1>
                <div className="row">
                    {this.getRows()}
                </div>
                <div>
                    <Button size="sm" display="inline-block" color="primary" onClick={this.prev} style={{float:"left"}}>Prev</Button> 
                    <Button size="sm" display="inline-block" color="primary" onClick={this.next} style={{float:"right"}}>Next</Button> 
                </div>
            </div>
            
    );
  }
}

export default Home;