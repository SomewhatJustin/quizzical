import React from 'react'
import SingleAnswer from './SingleAnswer'
import { nanoid } from 'nanoid'

export default function Answers(props) {
	
	
	



	// Generate a list of answers. Mark the correct one.
	const allAnswers = () => {
		
		
		let answersArray = []
		
		// Add the correct answer
		answersArray.push({text: props.correct_answer.value, isCorrect: true, id: props.correct_answer.id})
		
		
		// Add the incorrect answers
		for (let i = 0; i < props.incorrect_answers.length; i++) {
			answersArray.push({text: props.incorrect_answers[i].value, isCorrect: false, id: props.incorrect_answers[i].id})
		}
		
		// Array of JSX
		let answersJSX = []
		for (let j = 0; j < answersArray.length; j++) {
			let id = nanoid()
			answersJSX.push(
				<SingleAnswer 
					key={id}
					answerId={answersArray[j].id}
					questionId = {props.questionId}
					text={answersArray[j].text}
					isCorrect={answersArray[j].isCorrect}
					selectAnswer={props.selectAnswer}
					selectedAnswers={props.selectedAnswers} />
			)
		}
		// Randomize order of answers
		let correctIndex = Math.ceil(Math.random()*4)
		let correctAnswer = answersJSX[0]
	
		answersJSX.splice(correctIndex, 0, correctAnswer)
		answersJSX.shift()
		
		return answersJSX
	}

	
	return (
		<>
			{allAnswers()}
		</>
	)
}