var Card = require ('./models/Card')
var Deck = require ('./models/Deck')
var Game = require ('./game')

module.exports = class Communication {
    constructor(io,game,players) {
      this.io = io
      this.game = game
      this.players = players
    }

    getCurrentPlayer(positionPlayer){
      return this.players.playersLoggedList[positionPlayer]
    }

    getSocket(positionPlayer){
      return this.getCurrentPlayer(positionPlayer).socketID
    }

    updatePioche(){
      this.io.emit('updatePioche', this.game._Pioche,this.game.nbCard());
    }
    updateBin(){
      this.io.emit('updateBin', this.game._Defausse);
    }
    drawRandom(positionPlayer,randomCard){
      this.updatePioche()
      this.updateBin()
      this.io.emit('updateRandom', randomCard);
    }

    handMoved(positionPlayer){
      this.io.to(this.getSocket(positionPlayer)).emit('hand', this.getCurrentPlayer(positionPlayer).hand);
      this.handOthers()
    }

    handOthers(){
      this.io.emit('handOther', this.players.playersLoggedList);
    }
  }