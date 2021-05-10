import Card from "./card";

export default class Hand {
    constructor(cards) {
      this.cards = [new Card("wqwq"), new Card("La"), new Card("Fa#")];
    }

    fromString(str){
      let splited = str.split('@');
      this.cards = []
      for (let i = 0; i < splited.length; i++) {
        if(splited[i] !== "")
          this.cards.push(new Card(splited[i]));
      }
    }

    fromJSON(str){
      if(str){
        let t = this
        console.log("str Hand fromJson", str)
        this.cards = []
        str.cards.map(function(card){
          //console.log("str Hand fromJson map card",JSON.stringify(card), card.name)
          var cardToAdd = new Card(card.name)
          t.cards.push(cardToAdd)
          return null
        })
      }
      return this
    }

    getCards(){
      return this.cards;
    }
  }
