import React, { useState, useEffect } from "react";
import "./quiz-details.css";
import { QuizComponentProps } from "../../views/commonProps";
import AnswerOption from "../answer-option-layout/answer-option-layout";
import { Prompt } from "react-router";

// TODO rework when backend starts sending list of answer options

const QuizDetails: React.FC<QuizComponentProps> = ({ quiz }) => {
  const [readyForSubmission, setReadyForSubmission] = useState<boolean>(false);
  const [quizNotFinished, setQuizNotFinished] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([
    false,
    false,
    false,
  ]);

  // Similar to componentDidMount and componentDidUpdate
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

    let updatedReadForSubmission = updatedAnswered.every((q) => q === true);
    setReadyForSubmission(updatedReadForSubmission);

    if (updatedReadForSubmission) {
      setQuizNotFinished(false);
    }
  }

  const options: any = [];
  quiz.questions.forEach((q, questionIndex) => {
    options[q.id] = [];
    options[q.id].push(
      <AnswerOption
        postType="quiz"
        postIndex={questionIndex}
        isAnswered={answeredQuestions[questionIndex]}
        key={0}
        optionIndex={0}
        option={q.answer}
        onOptionSelected={onQuestionAnswered}
        isCorrectAnswer={submitted}
      />
    );
    options[q.id].push(
      <AnswerOption
        postType="quiz"
        postIndex={questionIndex}
        isAnswered={answeredQuestions[questionIndex]}
        key={1}
        optionIndex={1}
        option={q.mistake1}
        onOptionSelected={onQuestionAnswered}
        isCorrectAnswer={submitted}
      />
    );
    q.mistake2 &&
      options[q.id].push(
        <AnswerOption
          postType="quiz"
          postIndex={questionIndex}
          isAnswered={answeredQuestions[questionIndex]}
          key={2}
          optionIndex={2}
          option={q.mistake2!!}
          onOptionSelected={onQuestionAnswered}
          isCorrectAnswer={submitted}
        />
      );
    q.mistake3 &&
      options[q.id].push(
        <AnswerOption
          postType="quiz"
          postIndex={questionIndex}
          isAnswered={answeredQuestions[questionIndex]}
          key={3}
          optionIndex={3}
          option={q.mistake3!!}
          onOptionSelected={onQuestionAnswered}
          isCorrectAnswer={submitted}
        />
      );
  });

  return (
    <div className="quiz-container">
      <Prompt
        when={quizNotFinished}
        message="You have unsaved changes, are you sure you want to leave?"
      />
      {quiz.questions.map((q, i) => (
        <div
          key={q.id}
          className={`question-component-section ${
            answeredQuestions[i] ? "answered" : ""
          }`}
        >
          <div className="quiz-question">{q.question}</div>
          <div className={` ${submitted ? "answered" : ""}`}>
            {options[q.id]}
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
