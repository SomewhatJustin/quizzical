import React from "react"

export default function Splash(props) {
  return (
    <div className="splash">
      <h1>Quizzical!</h1>
      <button onClick={props.toggle}>Start quiz</button>
    </div>
  )
}
