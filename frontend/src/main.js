import React from 'react';
import LoginComponent from './Login'
import GameComponent from "./Game"

export default class MainComponent extends React.Component {
    constructor(props) {
      super(props);
      //let lala = {props};
      this.state = {
        name: "",
        isLogged: false,
        positionPlayer: -1,
        isAdmin: false,
        socket: props.socket
      }

    }
  
    componentDidMount() {
      console.log("componentDidMount MainComponent",this.state.socket)
      //this.fetch();
      //this.state.socket.emit('chat messages', "aaaaaaaaaaaaaaaaaaa");;
      this.state.socket.on('connected', (name,positionPlayer,isAdmin) => {
        console.log( "connected ",positionPlayer)
        this.setState({name: name,isLogged: true,positionPlayer: positionPlayer, isAdmin: isAdmin});
      })
    }

    sendName(name){
      this.setState({name: name});
      this.state.socket.emit('newPlayer', name);
    }

    render() {
      let button;
      if (!this.state.isLogged) {
        button = <LoginComponent loginCall={ (name) => this.sendName(name)} />;
      } else {
        button = <GameComponent name={this.state.name} positionPlayer={this.state.positionPlayer} socket={this.state.socket} isAdmin={this.state.isAdmin}/>;
      }
      return  button;
    }
  }
