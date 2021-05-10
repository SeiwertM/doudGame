import React from 'react';
export default class AzertyComponent extends React.Component {
    constructor(props) {
      super(props);
      //let lala = {props};
      this.state = {
        firstName: "aa",
        lastName: "ss",
        lala: props.lala
      }
    }
  
    componentDidMount() {
      console.log("dsdsd",this.state.lala)
      //this.fetch();
      this.state.lala();
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
      return null;
    }
  }
