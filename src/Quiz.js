import React from "react"
import Question from "./Question"
import Answers from "./Answers"
import { nanoid } from "nanoid"
import he from "he"

export default function Quiz(props) {
  const [selectedAnswers, setSelectedAnswers] = React.useState([]) // which answers are currently selected?
  const [quizData, setQuizData] = React.useState([]) // we'll add state to this in a useEffect function
  const [isGraded, setIsGraded] = React.useState(false) // has the quiz been graded?
  const [numCorrectAnswers, setNumCorrectAnswers] = React.useState(0)

  // Get quiz data from API
  React.useEffect(() => {
    console.log("running useEffect")
    const getQuizData = async () => {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      )
      const data = await res.json()

      const QandA = []
      for (let i = 0; i < (await data.results.length); i++) {
        let incorrectAnswers = data.results[i].incorrect_answers.map(
          (item) => ({ value: he.decode(item), id: nanoid() })
        )
        const correctIndex = Math.ceil(Math.random() * 4)

        QandA.push({
          ...data.results[i],
          question: {
            value: he.decode(data.results[i].question),
            id: nanoid(),
          },
          correct_answer: {
            value: he.decode(data.results[i].correct_answer),
            id: nanoid(),
          },
          incorrect_answers: incorrectAnswers,
          correctIndex: correctIndex,
        })
      }

      setQuizData(QandA)
    }

    getQuizData().catch(console.error)
  }, [props.isGraded])

  // Select an answer
  function selectAnswer(questionId, answerId) {
    if (isGraded) {
      return
    }

    let newArr = []

    if (newArr.find((pair) => pair.question === questionId)) {
      let indexAt = newArr.findIndex((pair) => pair.question === questionId)
      newArr.splice(indexAt, 1, { question: questionId, answer: answerId })
    } else {
      newArr.push({ question: questionId, answer: answerId })
    }

    setSelectedAnswers((prevArray) => [
      ...prevArray.filter((item) => item.question !== questionId),
      { question: questionId, answer: answerId },
    ])
  }

  // Grade the Quiz
  function grade() {
    // Don't grade if they haven't completed the quiz
    if (selectedAnswers.length < quizData.length) {
      return
    }

    setIsGraded(true)

    // calculate # of correct answers
    // get list of selected answers
    // get list of correct answers
    // see how many matches there are by iterating over one list and comparing to the other each time

    let correctAnswers = quizData.map((item) => item.correct_answer.id)
    let finalSelections = selectedAnswers.map((item) => item.answer)
    console.log(finalSelections)
    for (let i = 0; i < quizData.length; i++) {
      if (correctAnswers.includes(finalSelections[i])) {
        setNumCorrectAnswers((old) => old + 1)
      }
    }
  }

  // Start the quiz over
  function playAgain() {
    setIsGraded(false)
    props.setIsStarted(false)
  }

  // Create Question and Answer Elements
  const quesAns = () => {
    let elements = []
    for (let i = 0; i < quizData.length; i++) {
      const id = nanoid()
      elements.push(
        <Question
          key={nanoid()}
          questionId={quizData[i].question.id}
          question={quizData[i].question.value}
        />
      )
      elements.push(
        <Answers
          key={nanoid()}
          questionId={quizData[i].question.id}
          correct_answer={quizData[i].correct_answer}
          correctIndex={quizData[i].correctIndex}
          incorrect_answers={quizData[i].incorrect_answers}
          selectedAnswers={selectedAnswers}
          selectAnswer={selectAnswer}
          isGraded={isGraded}
        />
      )
    }
    return elements
  }

  return (
    <main>
      <div className="quiz">{quesAns()}</div>
      <div className="end-quiz">
        {!isGraded && <button onClick={grade}>Grade it</button>}
        {isGraded && (
          <span className="correct-count">
            You got {numCorrectAnswers}/{quizData.length} correct
          </span>
        )}
        {isGraded && (
          <button className="play-again-btn" onClick={playAgain}>
            Play Again
          </button>
        )}
      </div>
    </main>
  )
}
