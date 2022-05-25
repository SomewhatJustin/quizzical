import React from "react"
import Question from "./Question"
import Answers from "./Answers"
import { nanoid } from "nanoid"

export default function Quiz(props) {
  const [selectedAnswers, setSelectedAnswers] = React.useState([]) // which answers are currently selected?
  const [quizData, setQuizData] = React.useState([]) // we'll add state to this in a useEffect function
  const [isGraded, setIsGraded] = React.useState(false) // has the quiz been graded?

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
          (item) => ({ value: item, id: nanoid() })
        )
        const correctIndex = Math.ceil(Math.random() * 4)

        QandA.push({
          ...data.results[i],
          question: { value: data.results[i].question, id: nanoid() },
          correct_answer: {
            value: data.results[i].correct_answer,
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

    console.log(questionId)

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
    if (selectedAnswers.length < 5) {
      return
    }

    setIsGraded((old) => !old)

    console.log(selectedAnswers)
    console.log(quizData[0].correct_answer)
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

  quesAns()

  return (
    <main>
      <h1>Quiz!</h1>
      {quesAns()}
      {!isGraded && <button onClick={grade}>Grade it</button>}
      {isGraded && <button onClick={playAgain}>Play Again</button>}
    </main>
  )
}
