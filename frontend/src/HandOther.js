import React from 'react';

import { Button } from '@material-ui/core';
import Card from './models/card'
import Hand from './models/hand';
import HandCardComponent from './HandCard';
import HandComponent from './Hand';
import HandCardRevertComponent from './HandCardRevert';

export default class HandOtherComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hands: [new Hand(),new Hand(),new Hand()],
      players: ["Doud","Woum","Booba"],
      cardPlayed: [[],[],[]],
      onClick: props.click
    };
  }
  

  updateHand(handOtherRequest){
    console.log("HandOtherComp handOtherRequest",handOtherRequest)
    let handTemp = []
    let playersTemp = []
    let cardPlayedTemp = []
    handOtherRequest.map(function(player){
      handTemp.push(new Hand().fromJSON(player.hand))
      playersTemp.push(player.name)
      cardPlayedTemp.push(player.cardPlayed)
      return null
    })
    console.log("HandOtherComp handOtherRequest end",handTemp,playersTemp)
    this.setState({
      players: playersTemp,
      cardPlayed: cardPlayedTemp,
      hands: handTemp
    })
    this.forceUpdate()
  }

  render() {
    let context = this
    console.log("HandOtherComp render",this.state)
    return (
      <span>

        {this.state.hands.map(function(hand,indexMain){
          const cards = hand.getCards();
          let nameMain = indexMain+"/"+cards.length
          let items = cards.map(function(card,index){
            let name = card.name+index+cards.length
            return (<HandCardRevertComponent key={name} card={card} id={index} isClicked={false}></HandCardRevertComponent>
                )
            }
            )
          let cardPlayed = context.state.cardPlayed[indexMain].map(function(cardsPlay,index){
              let name = indexMain+cardsPlay.name+index+cardsPlay.length
              return (<Button key={name} variant="outlined" disabled color="secondary" >{cardsPlay.name}</Button>
                  )
              })
          
         return (<span key={nameMain} > <br /><br /><br />{context.state.players[indexMain]}<br />{items} <br /><br /> {cardPlayed}<br />
         <Button onClick={() => {
            if(context.state.onClick)
              context.state.onClick(indexMain)
           }} variant="contained" color="primary">{"Revert"}</Button></span>)
          }
        )}
      </span>
    );
    /*console.log("this.state.items ",this.state.items)
    return (<>{this.state.items}</>)*/
  }
}
