var Card = require ('./models/Card')
var Deck = require ('./models/Deck')

module.exports = class Game {
    constructor() {
    }

    create(nbPlayer,pulsation,mesure){
      this._NbPlayer = nbPlayer
      this._Defausse = new Card("")
      this._Pioche = new Card("")
      this._Pulsation = pulsation
      this._Mesure = mesure
      this._Deck = new Deck(nbPlayer)
      this.Pioche()
    }

    nbCard(){
      return this._Deck.nbCard()
    }

    ChoseCard(){
      return this._Deck.pioche();
    }

    Pioche(){
      return (this._Pioche = this.ChoseCard())
    }
    
    Alea(){
      var card = this.ChoseCard();
      this._Defausse = this._Pioche
      this.Pioche()
      return card
    }

    Defausse(){
      var currDefausse = this._Defausse
      this._Defausse = null
      return currDefausse
    }
  }