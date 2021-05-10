import React from 'react';
export default class PersonComponent extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        firstName: "aa",
        lastName: "ss"
      }
    }
  
    componentDidMount() {
      console.log("dsdsd")
      //this.fetch();
    }
  
    async fetch() {
      console.log("fetch");
      console.log("this",this);
      var context = this
  
      let response = await fetch("../testGet2", {
              method: "GET"
              })
  
          console.log(response.status); // 200
          console.log(response.statusText); // OK
  
          if (response.status === 200) {
              let data = JSON.parse(await response.text());
              // handle data
              console.log("data",data)
              console.log(data.firstName)
              console.log(context.state)
              context.setState({
          firstName: data.firstName,
          lastName: data.lastName
        });
              console.log(context.state)
              context.state.firstName = data.firstName
              console.log(context.state)
          }
  /*
      $.ajax({
        url: '../testGet',
        method: 'GET',
        success: function(response) {
          context.setState({
            firstName: response.firstName,
            lastName: response.lastName
          });
        }
      });*/
    }
  
    render() {
      return (
        <div className="App">
        <header className="App-header">
          <img className="App-logo" 
               alt="logo" />
            
  <p>A simple React app.....</p>
    
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <form action="/post" method="post" 
                className="form">
            <button type="submit">Connected?</button>
          </form>
          <button onClick={() => this.fetch()}>deux</button>
          <h1>aaaa {this.state.firstName} {this.state.lastName}</h1>
        </header>
      </div>
      );
    }
  }
