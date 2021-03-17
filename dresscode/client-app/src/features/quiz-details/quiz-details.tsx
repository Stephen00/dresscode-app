import React, { useState, useEffect, useContext } from "react";
import "./quiz-details.css";
import { QuizComponentProps } from "../../views/commonProps";
import AnswerOption from "../answer-option-layout/answer-option-layout";
import { Prompt } from "react-router";
import PostStore from "../../app/stores/postStore";
import { observer } from "mobx-react-lite";

const QuizDetails: React.FC<QuizComponentProps> = ({ quiz }) => {
  const postStore = useContext(PostStore);
  const { submitQuiz, selectedPost } = postStore;
  const [quizNotFinished, setQuizNotFinished] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Map<number, string>>(
    new Map()
  );

  // Covers the effect of componentDidMount and componentDidUpdate
  useEffect(() => {
    if (quizNotFinished) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = null;
    }
  });

  function onQuestionAnswered(optionIndex: number, questionId: number) {
    let selectedAnswer = quiz.questions.filter((q) => q.pk === questionId)[0]
      .answers[optionIndex];
    let updatedUserAnswers = new Map();
    userAnswers.forEach((value, key) => updatedUserAnswers.set(key, value));
    updatedUserAnswers.set(questionId, selectedAnswer);
    setUserAnswers(updatedUserAnswers);

    setQuizNotFinished(
      updatedUserAnswers.size > 0 &&
        updatedUserAnswers.size < quiz.questions.length
    );

    // quiz is ready for submission
    if (updatedUserAnswers.size === quiz.questions.length) {
      submitQuiz(updatedUserAnswers).then(() => {
        setSubmitted(true);
        console.log(quiz.score);
      });
    }
  }

  // Mapping from question pk to components containing the answers to the question
  const options: Map<Number, JSX.Element[]> = new Map();
  quiz.questions.forEach((q) => {
    options.set(q.pk, []);
    q.answers.forEach((option, optionIndex) => {
      options
        .get(q.pk)
        ?.push(
          <AnswerOption
            postType="quiz"
            postIndex={q.pk}
            isAnswered={userAnswers.has(q.pk)}
            key={optionIndex}
            optionIndex={optionIndex}
            option={option}
            onOptionSelected={onQuestionAnswered}
          />
        );
    });
  });

  return (
    <div className="quiz-container">
      <Prompt
        when={quizNotFinished}
        message="You haven't finished the quiz! Are you sure you want to leave?"
      />
      {quiz.questions.map((q, i) => (
        <div
          key={i}
          className={`question-component-section ${q.pk} ${
            userAnswers.has(q.pk) ? "answered" : ""
          }`}
        >
          <div className="quiz-question">{q.question}</div>
          <div>{options.get(q.pk)}</div>
        </div>
      ))}
      {submitted && (
        <div className="after-submission-section">
          <div>Thank you for your answer!</div>
          <div>
            Result: {quiz.score}/ {quiz.questions.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default observer(QuizDetails);
