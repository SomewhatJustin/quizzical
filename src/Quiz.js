import React from 'react'
import Question from './Question'
import Answers from './Answers'
import { nanoid } from 'nanoid'

export default function Quiz(props) {
	  
	const [selectedAnswers, setSelectedAnswers] = React.useState([]) // which answers are currently selected?
	const [quizData, setQuizData] = React.useState([]) // we'll add state to this in a useEffect function
	
	// Get quiz data from API
	  React.useEffect(() => {
		console.log("running useEffect")
		const getQuizData = async () => {
		  const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple')
		  const data = await res.json()
		  
		  const QandA = []
		  for (let i = 0; i < await data.results.length; i++) {
			  
			  let incorrectAnswers = data.results[i].incorrect_answers.map(item => ({value: item, id: nanoid()}))
			  
			  
			  QandA.push({...data.results[i], question: {value: data.results[i].question, id: nanoid()}, correct_answer: {value: data.results[i].correct_answer, id: nanoid()}, incorrect_answers: incorrectAnswers})
		  }
		  
		  setQuizData(QandA)
		}
		
		getQuizData()
		  .catch(console.error)
	  }, [props.isGraded])
	
	
	// Select an answer
	  function selectAnswer(questionId, answerId) {
		  console.log(questionId)
		
		let newArr = []

		if (newArr.find(pair => pair.question === questionId)) {
			let indexAt = newArr.findIndex(pair => pair.question === questionId)
			newArr.splice(indexAt, 1, {question: questionId, answer: answerId})
		} else {
			newArr.push({question: questionId, answer: answerId})
		}
	
		
		// prevArray.map(item => item.question === questionId ? {...item, answer: answerId} : {question: questionId, answer: answerId})
		
		
		setSelectedAnswers(prevArray => [...prevArray.filter(item => item.question !== questionId), {question: questionId, answer: answerId}])
		
	
	  }
	
	console.log(selectedAnswers)
	
	const quesAns = () => {
		let elements = []
		for (let i = 0; i < quizData.length; i++) {
			const id = nanoid()
			elements.push(
					<Question
						key={nanoid()}
						questionId={quizData[i].question.id}
						question={quizData[i].question.value} />
			)
			elements.push(
					<Answers 
						key={nanoid()}
						questionId={quizData[i].question.id}
						correct_answer={quizData[i].correct_answer}
						incorrect_answers={quizData[i].incorrect_answers}
						selectedAnswers={selectedAnswers}
						selectAnswer={selectAnswer}
						/>
			)
		}
		return elements	
	}
	
	quesAns()
	

	
	return (
		<main>
			<h1>Quiz!</h1>
			{quesAns()}
		</main>
	)
}