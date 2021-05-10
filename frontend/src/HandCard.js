import React from 'react';

import { Button } from '@material-ui/core';

export default class HandCardComponent extends React.Component {
    constructor(props) {
      super(props);
      console.log("HandCardComponent props",props)
      this.state = {
        card: props.card,
        id: props.id,
        isClicked: false,
        onClick: props.click
      };
    }

    clicked(){
      let cardTmp = this.state.card
      cardTmp.isSelectionned = !cardTmp.isSelectionned;
      this.setState({card :cardTmp})
    }
  
    render() {
      console.log("HandCardComponent rebnder",this)
      let context = this      
      return (
        <Button onClick={() => {
          if(context.state.onClick)
            context.state.onClick(context)
        }} variant="contained"  color={this.state.card.isSelectionned?"secondary":"default"}>{this.state.card.name}</Button>
      );
    }
  }
