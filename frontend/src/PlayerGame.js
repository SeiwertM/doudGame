import React from 'react';
export default class PlayerGameComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name
    };
  }

  render() {
    return (
      <div>
        <span>{this.state.name}</span> <img src="images/game.JPG" style={{verticalAlign: "middle" }} alt="" />
      </div>
    );
  }
}

