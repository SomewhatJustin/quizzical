import React from "react"

export default function singleAnswer(props) {
  const questionId = props.questionId
  const answerId = props.answerId

  // See if this answer has been selected
  let isSelected = false
  isSelected = props.selectedAnswers
    .map((item) => item.answer)
    .includes(answerId)

  //console.log(props.selectedAnswers.find(item => item.question === questionId))

  // see if my question id is in the selectedAnswers array
  // if yes, see if this answer id is in there
  // console.log(selectedAnswers.find(item => item.question = questionId))

  // Conditional classes
  let answerClass = "answer"

  if (!props.isGraded) {
    answerClass += isSelected ? " selected" : " not-selected"
  } else if (props.isGraded) {
    if (isSelected) {
      answerClass = props.isCorrect ? "right-answer" : "wrong-answer"
    } else if (!isSelected && props.isCorrect) {
      answerClass += " missed-answer"
    }
  }

  return (
    <>
      <p
        onClick={() => props.selectAnswer(questionId, answerId)}
        className={answerClass}
      >
        {props.text}
      </p>
    </>
  )
}
