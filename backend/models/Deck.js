var Card = require ('./Card')
var Hand = require ('./Hand')

module.exports = class Deck {
    constructor(nbPlayer) {
        this._nbPlayer = nbPlayer;
        var baseCard = ["do|2","do#|2","ré|2","ré#|2","Mi|2",
        "Fa|2","Fa#|2", "Sol|2", "Sol#|2", "La|2", "La#|2", "Si|2", "#|4", "♭|4",
        "I|0", "V|0"]
        this._BaseDeck = []
        var t = this
        baseCard.forEach(element => {
            var note = element.split("|")
            var size = (parseInt(note[1])+t._nbPlayer)
            for(var i = 0; i < size;i++){
                t._BaseDeck.push(new Card(note[0]))
            }
        });
        this.resetDeck(null)
    }

    pioche(){
        //console.log("pioche deck1",this)
        var valueChose = Math.floor(Math.random() * this._currDeck.length)
        var card = this._currDeck[valueChose]
        this._currDeck.splice(valueChose,1)
        //console.log("pioche deck",valueChose,card,this)
        return card;
    }

    //cardsPlayed : ar of Card
    resetDeck(cardsPlayed){// get all cards from players hands + pioche + defausse
        this._currDeck = [... this._BaseDeck]
        if(cardsPlayed){ 
            var i = -1;
            while(cardsPlayed.length > 0){ 
                if(cardsPlayed.length <= 0)
                    break
                i++
                if(i >= this._currDeck.length) //Not found ?
                {
                    cardsPlayed.splice(0, 1); 
                    i = 0
                }
                if ( cardsPlayed[0].isEqual(this._currDeck[i])) { //Found
                    this._currDeck.splice(i, 1); 
                    cardsPlayed.splice(0, 1); 
                    i = -1
                }
            }
        }
      }

    nbCard(){
        return this._currDeck.length
    }
  }