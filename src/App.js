import logo from './logo.svg';
import './App.css';
import Splash from './Splash'
import Quiz from './Quiz'
import React from 'react'

function App() {
  
  // Set up State
  const [isStarted, setIsStarted] = React.useState(false) // has the user started the game?
  const [isGraded, setIsGraded] = React.useState(false) // has the quiz been graded?
  const [quizData, setQuizData] = React.useState(getQuizData()) // quiz data from API
  const [selectedAnswers, SetSelectedAnswers] = React.useState([]) // which answers are currently selected?
  
  // useEffect
  
  
  // Get quiz questions
  async function getQuizData() {
    const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple')
    const data = await res.json()
    return data.results
  }
  
  // Toggle a state
  function toggle(state) {
    if (state = "isStarted") {
      setIsStarted(old => !old) 
    }
  }

  
  return (
    <div className="App">
      {!isStarted && <Splash 
                      toggle={() => toggle("isStarted")}/>}
      {isStarted && <Quiz />}
    </div>
  );
}

export default App;
