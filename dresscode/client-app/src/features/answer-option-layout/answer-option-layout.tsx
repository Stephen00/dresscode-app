import React, { useState } from "react";
import "./answer-option-layout.css";
import { Col, Row, Button } from "react-bootstrap";

interface AnswerOptionProps {
  optionIndex: number;
  option: string;
  postIndex: number;
  postType: string;
  onOptionSelected: (optionIndex: number, postIndex: number) => void;
  optionCounts?: number | undefined;
  totalVotes?: number | undefined;
  isParentQuestionAnswered: boolean;
  isQuizSubmitted: boolean;
  isCorrectAnswer: boolean;
}

const AnswerOption: React.FC<AnswerOptionProps> = ({
  optionIndex,
  postIndex,
  postType,
  isParentQuestionAnswered,
  option,
  optionCounts,
  onOptionSelected,
  totalVotes,
  isCorrectAnswer,
  isQuizSubmitted,
}) => {
  const [isChosenOption, setChosenOption] = useState<boolean>(false);
  const [hoveringOver, setHoveringOver] = useState<boolean>(false);

  function handleOptionSelected() {
    if (!isParentQuestionAnswered) {
      onOptionSelected(optionIndex, postIndex);
      setChosenOption(true);
    }
  }

  return (
    <div
      key={postIndex * 10 + optionIndex}
      aria-disabled={isParentQuestionAnswered}
    >
      <Row className="option-row">
        <Col xs={2} className="option-button-column">
          <Button
            className="option-checkbox"
            onClick={() => handleOptionSelected()}
          >
            <i
              className={`fas fa-check fa-2x ${
                hoveringOver ? "hovering" : ""
              }  ${isChosenOption ? "chosen" : ""} `}
            ></i>
            {/* <i
              className="fas fa-times fa-2x"
              hidden={
                !(
                  postType === "quiz" &&
                  isAnswered &&
                  isCorrectAnswer &&
                  !isCorrectAnswer
                )
              }
            ></i> */}
          </Button>
        </Col>
        <Col
          xs={7}
          onMouseEnter={() => setHoveringOver(true)}
          onMouseLeave={() => setHoveringOver(false)}
          onClick={() => handleOptionSelected()}
          className={`option-answer-column ${
            hoveringOver ? "hovering-text" : ""
          } ${
            postType === "quiz" && isQuizSubmitted && isCorrectAnswer
              ? "correct-quiz-answer"
              : ""
          }`}
        >
          {option}
        </Col>

        {postType === "poll" &&
          isParentQuestionAnswered &&
          optionCounts !== undefined &&
          totalVotes !== undefined && (
            <Col xs={3} className="option-count-column">
              {((optionCounts / totalVotes) * 100).toFixed(0)}%
            </Col>
          )}
      </Row>
    </div>
  );
};

export default AnswerOption;
