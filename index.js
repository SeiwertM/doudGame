// We can add the modules we imported from NPM using require
const express = require('express')
var bodyParser = require('body-parser')
var Game = require ('./backend/game')
var Communication = require ('./backend/communication')
var Card = require ('./backend/models/Card')
var Hand = require ('./backend/models/Hand')
var Player = require ('./backend/models/Player')
var Players = require ('./backend/players')

var game = new Game();
var players = new Players();

// Calling express as a function we create a basic web server
const app = express()


var http = require('http').Server(app);
var io = require('socket.io')(http, {
  cors: {
    origin: '*',
  }
});


var communication = new Communication(io,game,players);

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// This is the port where we will run our web server
const port = 8080


var fs = require('fs')
var baseFile;
fs.readFile("./WoumGame.html", 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  baseFile = data.replace(/azerty/g, "{'glossary': 2}");

});

var test = 1

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

// This is how we define the routes for the API's in our web server
// where the .get makes references to the http GET method
// and the '/' is the route
// the attached callback function will be called each time we get 
// a GET request to the '/' route
// In the callback the parameteres we get:
// req includes all the request information, eg headers
// res is an object we use to respond the http call!
app.get('/', function(req, res){
  test++
  //res.send('Hello World! '+test)
  //res.sendFile(__dirname + '/WoumGame.html');
  res.send(baseFile)
}
  )
app.use(function(req, res, next) {
  const origin = req.get('origin');
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');

  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
  } else {
    //console.log("origin",origin);
    next();
  }
    });
  app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/azerty");
    //res.send(req.body)
  });

let playersLogged = ""

game.create(4,3,3)

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
    socket.on('chat messages', (msg) => {
      console.log("----------")
      console.log("chatmessgae "+msg);
      io.to(socket.id).emit('private', "message rsc"+msg);
      io.emit('listPlayer', msg);
    });

    socket.on('playerDraw', (positionPlayer) => {
      var currPioche = game._Pioche
      game.Pioche()
      console.log("playerDraw ",positionPlayer,players.playersLoggedList[positionPlayer],currPioche)
      if(currPioche &&  players.playersLoggedList[positionPlayer]){ 
        players.playersLoggedList[positionPlayer].addCard(currPioche)
        communication.updatePioche(positionPlayer)
        communication.handMoved(positionPlayer)
      }
    })
    socket.on('playerDrawBin', (positionPlayer) => {
      var currCard = game._Defausse
      if(!currCard.isEmpty()){
        game._Defausse = new Card("")
        console.log("playerDrawBin ",positionPlayer,players.playersLoggedList[positionPlayer],currCard)
        if(currCard &&  players.playersLoggedList[positionPlayer]){ 
          players.playersLoggedList[positionPlayer].addCard(currCard)
          communication.updateBin(positionPlayer)
          communication.handMoved(positionPlayer)
        }
     }
    })
    socket.on('playerDrawRandom', (positionPlayer) => {
      var currCard = game.Alea()
      console.log("playerDrawRandom ",positionPlayer,players.playersLoggedList[positionPlayer],currCard)
      if(currCard &&  players.playersLoggedList[positionPlayer]){ 
        players.playersLoggedList[positionPlayer].addCard(currCard)
        io.to(socket.id).emit('hand', players.playersLoggedList[positionPlayer].hand);
        communication.drawRandom(positionPlayer)
        communication.handMoved(positionPlayer)
      }
    })
    socket.on('newPlayer', (namePlayer) => {
      console.log("----------",playersLogged)
      console.log("newPlayer "+namePlayer);
      
      var nameSplit = namePlayer.split("#")
      if(nameSplit.length > 1)
        namePlayer = nameSplit[0]

      // Check if Player is already subscribed
      var positionPlayer = -1
      for(var i = 0;i < players.playersLoggedList.length && positionPlayer == -1; i++){
        if(players.playersLoggedList[i].name == namePlayer)
          positionPlayer = i;
      }
      if(positionPlayer == -1){
        positionPlayer = players.playersLoggedList.push(new Player(namePlayer)) - 1
      }
      players.playersLoggedList[positionPlayer].socketID = socket.id
      io.to(socket.id).emit('connected', namePlayer, positionPlayer,nameSplit.length > 1);
      
      io.emit('listPlayer', players.playersLoggedList);

      communication.handMoved(positionPlayer)
      communication.updatePioche(positionPlayer)
      communication.updateBin(positionPlayer)
    });
    socket.on('getHand', (positionPlayer) => {
      if(players.playersLoggedList[positionPlayer])
        io.to(socket.id).emit('hand', players.playersLoggedList[positionPlayer].hand);
    });
    socket.on('getHandOther', (msg) => {
      communication.handOthers()
    });

    socket.on('revertPlayer', (playerPosition) => {
      players.playersLoggedList[playerPosition].revertHand()
      io.to(players.playersLoggedList[playerPosition].socketID).emit('hand', players.playersLoggedList[playerPosition].hand);
      io.to(socket.id).emit('handOther', players.playersLoggedList);
    });
    socket.on('playCard', (playerPosition,cards) => {
      console.log("playCard ",playerPosition,cards,players.playersLoggedList)
      players.playersLoggedList[playerPosition].playCards(cards)
      io.to(socket.id).emit('hand', players.playersLoggedList[playerPosition].hand);
      io.emit('handOther', players.playersLoggedList);
    });
  });

  app.post('/',jsonParser, function (req, res) {
    res.send(req.body)
    //res.send("sssss")
  })

  app.get('/testGet2',jsonParser, function (req, res) {
    res.send(JSON.stringify({
      firstName: "John",
      lastName: "Doe"
    }))
    //res.send("sssss")
  })


http.listen(port, () => {
  console.log('listening on *:'+port);
});