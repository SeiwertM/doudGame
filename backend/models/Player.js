var Hand = require ('./Hand')

module.exports = class Player {
    constructor(name) {
        this.hand = new Hand(null)
        this.prevHand = [] //unshift
        this.name = name
        this.socketID = 0
        this.cardPlayed = []
    }

    addCard(card){
        this.prevHand.unshift(this.hand.clone())
        this.hand.addCard(card)
    }

    revertHand(){
        if(this.prevHand.length > 1){
            this.hand = this.prevHand.shift()
            this.cardPlayed = []
        }
    }

    playCards(cards){
        let t = this
        console.log("playCards",cards,t.hand)
        this.cardPlayed = cards
        this.prevHand.unshift(this.hand.clone())
        cards.map(function(card){
            for(let i = 0;i < t.hand.cards.length;i++){
                console.log(t.hand.cards[i],card,t.hand.cards[i].isEqual(card))
                if(t.hand.cards[i].isEqual(card)){
                    t.hand.cards.splice(i,1)
                    console.log(t.hand.cards)
                    break;
                }
            }
            return null
        })
        console.log(t.hand)
    }
  }