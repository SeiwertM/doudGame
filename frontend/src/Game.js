import React from 'react';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import './game.css'

import Card from './models/card';

import HandComponent from './Hand';
import PlayerGameComponent from './PlayerGame';
import DrawComponent from './draw';
import AccordComponent from './Accord';
import HandOtherComponent from './HandOther';


export default class GameComponent extends React.Component {
    constructor(props) {
      super(props);
      let baseAccords = "I$7M@1@3M@5@7M$Sus2@1@2M@5$Sus4@1@4@5$5@1@5*II$7m@1@3m@5@7m$Sus2@1@2M@5$Sus4@1@4@5$5@1@5*III$7m@1@3m@5@7m$0@0@0@0$Sus4@1@4@5$5@1@5*IV$7M@1@3M@5@7M$Sus2@1@2M@5$0@0@0@0$5@1@5*V$7@1@3M@5@7m$Sus2@1@2M@5$Sus4@1@4@5$5@1@5*VI$7m@1@3m@5@7m$Sus2@1@2M@5$Sus4@1@4@5$5@1@5*VII$7m@1@3m@5dim@7m$0@0@0@0$0@0@0@0$0@0@0$b5@1@5dim$#5@1@5Aug".split('*')
      let finalAccords = []
      baseAccords.map((function(name,index){
        return finalAccords.push(baseAccords[index].split('$'))
      }))

      let sizeAccord = 1

      if( finalAccords.length === 1){
        sizeAccord = 12
      }else if( finalAccords.length === 2){
        sizeAccord = 6
      }else if( finalAccords.length === 3){
        sizeAccord = 4
      }else if( finalAccords.length === 4){
        sizeAccord = 3
      }else if(finalAccords.length === 5 || finalAccords.length === 6){
        sizeAccord = 2
      }

      this.state = {
        name: props.name,
        players: [],
        socket: props.socket,
        playersGame: [],
        accords: finalAccords,
        sizeAccord: sizeAccord,
        sizeMesure: 4,
        mesures: ["I","II","III","V"],
        arPlayers: [""],
        isAdmin: props.isAdmin,
        pioche: new Card(""),
        nbCards: 0,
        defausse: new Card(""),
        random: new Card(""),
        positionPlayer: props.positionPlayer
      };
      console.log("gamecomp state",this.state.accords)
      this.handComponent = React.createRef();
      this.handOtherComponent = React.createRef();
    }
    createData(name, calories, fat, carbs, protein) {
      return { name, calories, fat, carbs, protein };
    }
    accordClick(accordClicked,index) {
      console.log("clicked",accordClicked)
    }
    onHandPlay(cards) {
      console.log("onHandClicked",cards)
      let tempCardPlay = []
      cards.map(function(card){
        if(card.isSelectionned)
          tempCardPlay.push(card)
        return null;
      })
      this.state.socket.emit('playCard',this.state.positionPlayer,tempCardPlay)
      /*cards.map(function(card){
        card.isSelectionned = false;
      })*/
    }
    onRevert(position) {
      console.log("onRevert Clicked",position)
      this.state.socket.emit('revertPlayer',position)
    }
    DrawDraw() {
      this.state.socket.emit('playerDraw',this.state.positionPlayer)
    }
    DrawBin() {
      this.state.socket.emit('playerDrawBin',this.state.positionPlayer)
    }
    DrawRandom() {
      this.state.socket.emit('playerDrawRandom',this.state.positionPlayer)
    }
    addAdmin(){
      if(this.state.isAdmin)
        return  <><br /><br /><br /><br /><HandOtherComponent ref={this.handOtherComponent} click={(position) => this.onRevert(position)}/></>
      else
        return null
    }

    componentDidMount() {
      let t = this
      this.state.socket.on('listPlayer', listPlayer => {
        let splited = listPlayer;
        let playerGame = []
        for (let i = 0; i < splited.length; i++) {
          if(splited[i] !== "")
            playerGame.push(<PlayerGameComponent key={splited[i]} name={splited[i]} />);
        }
        t.setState({playersGame: playerGame});
        t.setState({pioche: new Card("")})
      })
      this.state.socket.on('hand', listCards => {
        console.log("hand received ",listCards,t.handComponent)
        //setTimeout(function() {
        if(t.handComponent && t.handComponent.current)
          t.handComponent.current.updateHand(listCards)
        else
          setTimeout(function() {
            t.state.socket.emit('getHand',this.state.positionPlayer)
          }, 2000);
        //}, 5000);
      })
      this.state.socket.on('updatePioche', (newCardPioche,nbCards) => {
        console.log("updatePioche received ",newCardPioche,this.state.pioche)
        if(!newCardPioche)
          newCardPioche = new Card("")
        this.setState({pioche: newCardPioche, nbCards: nbCards})
      })
      this.state.socket.on('updateBin', newCardBin => {
        console.log("updateBin received ",newCardBin,this.state.defausse)
        if(!newCardBin)
          newCardBin = new Card("")
        this.setState({defausse: newCardBin})
      })
      this.state.socket.on('updateRandom', newCardRandom => {
        
      })
      //setTimeout(function() {
      t.state.socket.emit('getHand',t.state.positionPlayer) //}, 1000);
      this.state.socket.on('handOther', handOtherJSON => {
        console.log("handOther received ",handOtherJSON,this.handOtherComponent)
        if(!t.state.isAdmin)
          return;
        //setTimeout(function() {
        if(t.handOtherComponent && t.handOtherComponent.current)
          t.handOtherComponent.current.updateHand(handOtherJSON)
        else
          setTimeout(function() {
            t.state.socket.emit('getHandOther')
          }, 2000);
        //}, 5000);
      })
    }
    render() {
      let t = this
      let val = "0"
      const playerGame = [];
      for (let i = 0; i < this.state.playersGame.length; i++) {
        let key = this.state.playersGame[i]+i+this.state.playersGame.length
        playerGame.push(<PlayerGameComponent key={key} name={this.state.playersGame[i]} />)
      }
      if(this.state.playersGame.length %2 === 0)
        val = "180"
        const buttonSpecial = {
          color: "rgba(0, 0, 0, 0.87)",
          padding: ["6px 16px", "5px 15px"],
          fontSize: "0.875rem",
          boxSizing: "border-box",
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontWeight: 500,
          lineHeight: 1.75,
          borderRadius: "0px",
          letterSpacing: "0.02857em",
          textTransform: "uppercase",
          border: "1px solid rgba(0, 0, 0, 0.23)",
          display: "block"
        }
      return (
        <div>
          <span style={{position: "relative",
    paddingLeft: 20+"px",
    paddingRight: 20+"px",
    paddingBottom: 5+"px",
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
    backgroundColor: "#f5f5f5",
    borderRadius: 6+"px",
    fontSize: 30+"px",
    textTransform: "uppercase",
    top: -2+"px"}}
    >{this.state.name}</span>
          <Grid container spacing={1} style={{marginTop: 20+"px", marginLeft: 0+"px"}}>
            <Grid item xs={12}>
             





            </Grid>
            <Grid item xs={3}>
            <img className ={val} src="images/Roue_-_Couleurs.png" alt="" /><img className ={val} src="images/rouenotegood.png" alt=""
            style={{position: "relative",top: -300+"px",
    marginBottom: -280+"px",
    transition: "transform 2s cubic-bezier(0.39, 0.58, 0.57, 1) 0s",
    transform: "rotate("+val+"deg)"}} /><br />
              <img className ={val} src="images/Roue_-_Couleurs.png" alt="" /><img className ={val} src="images/rouenotegood.png" alt=""
            style={{position: "relative",top: -300+"px",
    marginBottom: -280+"px",
    transition: "transform 2s cubic-bezier(0.39, 0.58, 0.57, 1) 0s",
    transform: "rotate("+val+"deg)"}} />
            </Grid>
            <Grid item xs={4}>

              <Grid container spacing={0}>
                {this.state.accords.map(function(arAccord,indexAccord){
                    let key = indexAccord+arAccord.length
                  return (<Grid item xs key={key} >
                  {arAccord.map(function(accord,index){
                    let key = accord+index+arAccord.length
                    return (<span key={key} ><AccordComponent accord={accord} position={indexAccord=== 0 ?AccordComponent.POSITION_START:AccordComponent.POSITION_MIDDLE} /><br /></span>)
                  })}
                </Grid>)
                })}
                
              </Grid>
            </Grid>
            
            <Grid item xs={5}>
            {/*this.state.arPlayers.map(function(name,index){
                return (
                  <Grid item xs={12}>
                  <Grid container spacing={1} style={{marginTop: 0+"px", marginLeft: 0+"px", alignItems: "center"}}>
                  <Grid item xs={2}>
                      {name}
                  </Grid>
                  <Grid item xs={10}> 
                  <Grid container spacing={0}>
                    {t.state.mesures.map(function(mesureName,indexMesure){
                      let elem = []
                      let name = mesureName+"@\u00A0@\u00A0@\u00A0@\u00A0"
                      
                      for(let i = 0; i < t.state.sizeMesure; i++){
                        let style = {display: "flex"}
                        if(i === 0 && indexMesure !== 0) 
                          style.marginLeft = "0px"
                        elem.push(<Grid item xs style={style}>
                        <AccordComponent click={t.accordClick} accord={name} position={i!== 0 ?AccordComponent.POSITION_MIDDLE:AccordComponent.POSITION_START} />
                        </Grid>
                        )
                      }
                      return elem
                    })}
                    
                  </Grid>
                </Grid>
              </Grid>
            </Grid>)})*/
            <div>
               <Grid container spacing={1} style={{marginTop: 0+"px", marginLeft: 0+"px"}}>
              <Grid item xs={4}>
                    {this.state.nbCards}<br />
                  <DrawComponent card={this.state.pioche} buttonName="Pioche" click={() => this.DrawDraw()} />
                </Grid>
                <Grid item xs={4}>
                <br />
                  <DrawComponent card={this.state.defausse} buttonName="Défausse" click={() =>this.DrawBin()}  />
                </Grid>
                <Grid item xs={4}>
                <br />
                  <DrawComponent card={this.state.random} buttonName="Aléatoire" click={() => this.DrawRandom()}  />
                </Grid>
              </Grid><br /><br /><br /><br /><br />
            <HandComponent ref={this.handComponent} click={(cards) => this.onHandPlay(cards)} />
            {this.addAdmin()}
            </div>
              }
            
            </Grid>
            
            <Grid item xs={12}>
              
            </Grid>
          </Grid>
        </div>
      );
    }
  }
