// import logo from "./logo.svg"
// import blueBlob from "./img/blue-blob.png"
import "./App.css"
import Splash from "./Splash"
import Quiz from "./Quiz"
import React from "react"
import { nanoid } from "nanoid"

function App() {
  // Set up State
  const [isStarted, setIsStarted] = React.useState(false) // has the user started the game?

  return (
    <div className="App">
      {!isStarted && (
        <Splash key={nanoid()} toggle={() => setIsStarted((old) => !old)} />
      )}
      {isStarted && <Quiz key={nanoid()} setIsStarted={setIsStarted} />}
    </div>
  )
}

export default App
