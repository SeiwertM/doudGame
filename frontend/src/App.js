
import logo from "./logo.svg";
import "./App.css";
import openSocket from 'socket.io-client';
import AzertyComponent from './azerty'
import MainComponent from './main'
const  socket = openSocket('http://90.86.88.99:8080');


//<PersonComponent />
function App() {
  return (
    <div className="App">
      <MainComponent socket={socket} />
    </div>
  );
}
  
export default App;