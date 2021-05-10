var Card = require ('./Card')

module.exports = class Hand {
    constructor(baseHand) {
        if( baseHand == null)
            this.cards = [new Card("do")];
        else
            this.cards = [...baseHand];
    }

    addCard(cardToAdd){
        this.cards.push(cardToAdd)
    }

    removeCard(cardPosition){
        this.cards.remove(cardPosition)
    }

    reset(newHand){
        this.cards = [...newHand]
    }

    clone(){
        return new Hand(this.cards)
    }

  }