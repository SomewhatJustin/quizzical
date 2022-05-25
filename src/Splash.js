import React from "react"

export default function Splash(props) {
  return (
    <>
      <h1>Quizzical!</h1>
      <button onClick={props.toggle}>Start quiz</button>
    </>
  )
}
