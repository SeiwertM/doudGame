var Card = require ('./models/Card')
var Deck = require ('./models/Deck')
var Game = require ('./game')

module.exports = class Players {
    constructor() {
      this.playersLoggedList = []
    }
  }