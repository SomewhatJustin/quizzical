import React from 'react'

export default function Splash(props) {
	return (
		<>
		<h1>Splashy!</h1>
		<button onClick={props.toggle}>Start!</button>
		</>
	)
}