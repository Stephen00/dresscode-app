import React, { useState, useEffect } from "react";
import "./quiz-details.css";
import { QuizComponentProps } from "../../views/commonProps";
import AnswerOption from "../answer-option-layout/answer-option-layout";
import { Prompt } from "react-router";

const QuizDetails: React.FC<QuizComponentProps> = ({ quiz }) => {
  const [quizNotFinished, setQuizNotFinished] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  // Covers the effect of componentDidMount and componentDidUpdate
  useEffect(() => {
    if (quizNotFinished) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = null;
    }
  });

  function onQuestionAnswered(optionIndex: number, questionIndex: number) {
    let updatedAnswered = [...answeredQuestions];
    updatedAnswered[questionIndex] = true;
    setAnsweredQuestions(updatedAnswered);

    let updatedQuizNotFinished = updatedAnswered.some((q) => q === true);
    setQuizNotFinished(updatedQuizNotFinished);

    let readyForSubmission = updatedAnswered.every((q) => q === true);

    if (readyForSubmission) {
      setQuizNotFinished(false);
    }
  }

  // Mapping from question pk to components containing the answers to the question
  const options: Map<Number, JSX.Element[]> = new Map(); 
  quiz.questions.forEach((q, questionIndex) => {
    options.set(q.pk, []);
    q.answers.forEach((option, optionIndex) => {
      options
        .get(q.pk)
        ?.push(
          <AnswerOption
            postType="quiz"
            postIndex={questionIndex}
            isAnswered={answeredQuestions[questionIndex]}
            key={optionIndex}
            optionIndex={optionIndex}
            option={option}
            onOptionSelected={onQuestionAnswered}
            isCorrectAnswer={submitted}
          />
        );
    });
  });

  return (
    <div className="quiz-container">
      <Prompt
        when={quizNotFinished}
        message="You have unsaved changes, are you sure you want to leave?"
      />
      {quiz.questions.map((q, i) => (
        <div
          key={i}
          className={`question-component-section ${q.pk} ${
            answeredQuestions[i] ? "answered" : ""
          }`}
        >
          <div className="quiz-question">{q.question}</div>
          <div className={` ${submitted ? "answered" : ""}`}>
            {options.get(q.pk)}
          </div>
        </div>
      ))}
      {submitted && (
        <div className="after-submission-section">
          <div>Thank you for your answer!</div>
          <div>Result: 10/15</div>
        </div>
      )}
    </div>
  );
};

export default QuizDetails;
