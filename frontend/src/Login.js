import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
export default class LoginComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        inputData: '',
        loginCall: props.loginCall
      };
    }
  
    render() {
      return (
        <div className="App" style={{marginTop: 20+"%",display:"flex", flexDirection:"row", justifyContent:"center"}}>
          <TextField
          id="pseudo"
          label="Pseudo"
          onInput={e => this.setState({ inputData : e.target.value})}
        /> 
          <Button onClick={() => this.state.loginCall(this.state.inputData)} variant="contained"  >OK</Button>
      </div>
      );
    }
  }
