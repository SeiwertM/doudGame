module.exports = class Card {
    constructor(name) {
        this.name = name;
    }

    isEqual(otherCard){
        return  otherCard.name.toLowerCase() == this.name.toLowerCase();
    }

    isEmpty(){
        return this.name == ""
    }
  }