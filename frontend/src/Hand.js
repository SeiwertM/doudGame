import React from 'react';

import { Button } from '@material-ui/core';
import Card from './models/card'
import Hand from './models/hand';
import HandCardComponent from './HandCard';

export default class HandComponent extends React.Component {
    constructor(props) {
      super(props);
      let hand = new Hand()

      let items = []
      /*const cards = hand.getCards();
      cards.map(function(card,index){
        items.push(<HandCardComponent key={card.name} card={card} id={index} isClicked={false} click={(card) =>{
          console.log("card ",card)
  
           card.set_isClicked(true)
        }}
         ></HandCardComponent>)
         return null
      })*/
      this.state = {
        hand: hand,
        onClick: props.click
      };
    }
    
    manageHand(cards){

    }
  

    updateHand(handRequest){
      let t = this
      console.log("HandCOmpo handRequest",handRequest)
      this.state.hand.fromJSON(handRequest)
      /*let items = []
      const cards = this.state.hand.getCards();
      cards.map(function(card,index){
        let name = card.name+index+cards.length
        items.push(<HandCardComponent key={name} card={card} id={index} isClicked={false} click={(card) =>{
          console.log(card.state.isClicked,"card ",card)
  
           card.set_isClicked(!card.state.isClicked)
        }}
         ></HandCardComponent>)
         return null
      })
      this.setState({
        items: items
      })*/
      this.forceUpdate()
    }
  
    render() {
      let context = this
      const cards = this.state.hand.getCards();
      console.log("getcard",cards)
      let items = []
      cards.map(function(card,index){
        let name = card.name+index+cards.length
        items.push(<><HandCardComponent key={name} card={card} id={index} isClicked={false} click={(card) =>{
          console.log("card ",card)

          card.clicked()
        }}
        /></>)})
      
      return (
        <span>
          {items}<br /><br />
      <Button onClick={() => {
          context.state.onClick(cards)
        }} variant="contained" color="primary">Jouer ces cartes</Button>
        </span>
      );
      /*console.log("this.state.items ",this.state.items)
      return (<>{this.state.items}</>)*/
    }
  }
