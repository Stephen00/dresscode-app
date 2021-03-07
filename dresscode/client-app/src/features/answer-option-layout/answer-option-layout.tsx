import React, { useState } from "react";
import "./answer-option-layout.css";
import { Col, Row, Button } from "react-bootstrap";

interface AnswerOptionProps {
  index: number;
  postType: string;
  isAnswered: boolean;
  option: string;
  onOptionSelected: Function;
  optionCounts?: number | undefined;
  totalVotes?: number | undefined;
  isCorrectAnswer?: boolean;
}

const AnswerOption: React.FC<AnswerOptionProps> = ({
  index,
  postType,
  isAnswered,
  option,
  optionCounts,
  onOptionSelected,
  totalVotes,
  isCorrectAnswer,
}) => {
  const [chosenOption, setChosenOption] = useState<boolean>(false);
  const [hoveringOver, setHoveringOver] = useState<boolean>(false);

  function handleOptionSelected() {
    if (!isAnswered) {
      onOptionSelected(index);
      setChosenOption(true);
    }
  }

  return (
    <div key={index} aria-disabled={isAnswered}>
      <Row className="option-row">
        <Col xs={2} className="option-button-column">
          <Button
            className="option-checkbox"
            onClick={() => handleOptionSelected()}
          >
            <i
              className={`fas fa-check fa-2x ${
                hoveringOver ? "hovering" : ""
              }  ${chosenOption ? "chosen" : ""} ${
                postType === "quiz" &&
                isAnswered &&
                isCorrectAnswer &&
                isCorrectAnswer
                  ? "correct-quiz-answer"
                  : ""
              }`}
            ></i>
            <i
              className="fas fa-times fa-2x"
              hidden={
                !(
                  postType === "quiz" &&
                  isAnswered &&
                  isCorrectAnswer &&
                  !isCorrectAnswer
                )
              }
            ></i>
          </Button>
        </Col>
        <Col
          xs={7}
          onMouseEnter={() => setHoveringOver(true)}
          onMouseLeave={() => setHoveringOver(false)}
          onClick={() => handleOptionSelected()}
          className={`option-answer-column ${
            hoveringOver ? "hovering-text" : ""
          }`}
        >
          {option}
        </Col>
        {postType === "poll" &&
          isAnswered &&
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
