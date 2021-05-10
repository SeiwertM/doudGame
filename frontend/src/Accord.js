import React from 'react';
import { Button } from '@material-ui/core';

import './css/Accord.css'



export default class AccordComponent extends React.Component {
  
    static POSITION_START = 1
    static POSITION_MIDDLE = 2
    constructor(props) {
      super(props);
      //console.log("props--",props)
      this.state = {
        accord: props.accord.split('@'),
        position: props.position,
        click: props.click
      };
    }

    cellStyle(name,index,max){
      let st = {borderColor: "red"}
      if(index === 0){
        st.border = "1px solid rgba(0, 0, 0, 0.23)"
        console.log(this.state.position,AccordComponent.POSITION_START)
        if(this.state.position === AccordComponent.POSITION_MIDDLE){
          st.borderLeftWidth = "0px"
        }
      }else {
        //1@2@3m@3M@4@5@5aug@5dim@7m@7M
        if(name === "1")
          st.backgroundColor = "RoyalBlue"
        else if(name === "2M")
            st.backgroundColor = "darkgreen"
        else if(name === "3m")
            st.backgroundColor = "YellowGreen"
        else if(name === "3M")
            st.backgroundColor = "LightGreen"
        else if(name === "4")
            st.backgroundColor = "MediumSeaGreen"
        else if(name === "5")
            st.backgroundColor = "gold"
        else if(name === "5Aug")
            st.backgroundColor = "Moccasin"
        else if(name === "5dim")
            st.backgroundColor = "SandyBrown"
        else if(name === "7m")
              st.backgroundColor = "Orchid"
        else if(name === "7M")
            st.backgroundColor = "MediumPurple"
        else if(name === "\u00A0"){
            st.backgroundColor = "DarkGray"
            st.color = "DarkGray"
        }
      }
      if(name === "0")
        st.visibility = "hidden"
      if(this.state.click)
        st.cursor = "cell"
      return st
    }
  
    render() {
      let t = this;
      return (
        <div style={{margin: "auto",width: "100%"}}>
          {this.state.accord.map(function(name,index){
              let key = name+index+t.state.accord.length
              return <span key={key} onClick={() => {
                console.log("clicked" )
                if(t.state.click)
                  t.state.click(t,index);
              }} style={t.cellStyle(name,index,t.state.accord.length)} className="Accord">{name}</span>
            }
          )}
        </div>
      );
    }
  }
