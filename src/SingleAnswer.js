import React from "react";

export default function singleAnswer(props) {
  const questionId = props.questionId;
  const answerId = props.answerId;

  // See if this answer has been selected
  let isSelected = false;
  isSelected = props.selectedAnswers
    .map((item) => item.answer)
    .includes(answerId);

  //console.log(props.selectedAnswers.find(item => item.question === questionId))

  // see if my question id is in the selectedAnswers array
  // if yes, see if this answer id is in there
  // console.log(selectedAnswers.find(item => item.question = questionId))

  return (
    <>
      <p
        onClick={() => props.selectAnswer(questionId, answerId)}
        className={isSelected ? "selected" : "not-selected"}
      >
        {props.text}
      </p>
      {props.isGraded && isSelected && props.isCorrect ? (
        <small>you were rite</small>
      ) : (
        <></>
      )}
    </>
  );
}