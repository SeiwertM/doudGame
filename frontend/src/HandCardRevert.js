import React from 'react';

import { Button } from '@material-ui/core';

export default class HandCardRevertComponent extends React.Component {
    constructor(props) {
      super(props);
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
      let context = this      
      return (
        <Button onClick={() => {
          if(context.state.onClick)
            context.state.onClick(context)
        }} variant="outlined" disabled >{this.state.card.name}</Button>
      );
    }
  }
