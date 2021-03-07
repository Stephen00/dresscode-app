import React, { useState } from "react";
import "./answer-option-layout.css";
import { Col, Row, Button } from "react-bootstrap";

interface AnswerOptionProps {
  optionIndex: number;
  postType: string;
  postIndex: number;
  isAnswered: boolean;
  option: string;
  onOptionSelected: (optionIndex: number, postIndex: number) => void;
  optionCounts?: number | undefined;
  totalVotes?: number | undefined;
  isCorrectAnswer?: boolean;
}

const AnswerOption: React.FC<AnswerOptionProps> = ({
  optionIndex,
  postIndex,
  postType,
  isAnswered,
  option,
  optionCounts,
  onOptionSelected,
  totalVotes,
  isCorrectAnswer,
}) => {
  const [isChosenOption, setChosenOption] = useState<boolean>(false);
  const [hoveringOver, setHoveringOver] = useState<boolean>(false);

  function handleOptionChosen() {
    if (!isAnswered) {
      onOptionSelected(optionIndex, postIndex);
      setChosenOption(true);
    }
  }

  return (
    <div key={postIndex * 10 + optionIndex} aria-disabled={isAnswered}>
      <Row className="option-row">
        <Col xs={2} className="option-button-column">
          <Button
            className="option-checkbox"
            onClick={() => handleOptionChosen()}
          >
            <i
              className={`fas fa-check fa-2x ${
                hoveringOver ? "hovering" : ""
              }  ${isChosenOption ? "chosen" : ""} ${
                postType === "quiz" &&
                isAnswered &&
                isCorrectAnswer &&
                isCorrectAnswer
                  ? "correct-quiz-answer"
                  : ""
              }`}
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
          onClick={() => handleOptionChosen()}
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
