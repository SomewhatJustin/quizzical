import logo from './logo.svg';
import './App.css';
import Splash from './Splash'
import Quiz from './Quiz'
import React from 'react'
import { nanoid } from 'nanoid'

function App() {
  
  // Set up State
  const [isStarted, setIsStarted] = React.useState(false) // has the user started the game?
  const [isGraded, setIsGraded] = React.useState(false) // has the quiz been graded?
  
  

  
  // Toggle a state
  function toggle(state) {
    if (state = "isStarted") {
      setIsStarted(old => !old) 
    }
  }
  

  
  return (
    <div className="App">
      {!isStarted && <Splash 
                      key={nanoid()}
                      toggle={() => toggle("isStarted")}/>}
      {isStarted && <Quiz
                      key={nanoid()} 
                      />}
    </div>
  );
}

export default App;
