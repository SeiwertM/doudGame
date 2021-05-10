import React from 'react';
import { Button } from '@material-ui/core';

import Card from './models/card';
export default class DrawComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        buttonName: props.buttonName,
        click: props.click
      };
    }


  
    render() {
      let t = this
      return (
        <div>
          <Button onClick={() => t.state.click()} variant="contained">{this.state.buttonName}</Button><br />
          {this.props.card.name}
      </div>
      );
    }
  }
