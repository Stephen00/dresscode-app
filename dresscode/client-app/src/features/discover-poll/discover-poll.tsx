import React, { useState } from "react";
import "./discover-poll.css";
import { Card, Col, Row, Button } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";
import { PollComponentProps } from "../../views/commonProps";

const DiscoverPoll: React.FC<PollComponentProps> = ({ poll }) => {
  const answers = [
    poll.answer1,
    poll.answer2,
    poll.answer3,
    poll.answer4,
    poll.answer5,
  ].filter(Boolean);

//Filter initialVotes by checking if they are Null or not instead of filtering by Boolean. 
//Filtering by boolean doesn't work because 0 is Falsy so Boolean(0) returns False in JS and TS
  var initialVotes = [
    poll.vote1,
    poll.vote2,
    poll.vote3,
    poll.vote4,
	poll.vote5,
  ].filter(function (vote) {
		return vote != null;
	});

  var initialTotalVotes = initialVotes.reduce((a, b) => a!! + b!!, 0);

  const [visible, setVisible] = useState<Boolean>(false);
  const [votes, setVotes] = useState<(number | undefined)[]>(initialVotes);
  const [totalVotes, setTotalVotes] = useState<number | undefined>(
    initialTotalVotes
  );

  const items: any = [];
  answers.forEach((value, index) => {
    items.push(
      <div key={index}>
        <Row className="vote-row">
          <Col xs={2} className="vote-button-column">
            <Button
              className="poll-button"
              onClick={() => handlePollClick(index)}
            ></Button>
          </Col>
          <Col xs={7} className="vote-answer-column">
            {value}
          </Col>
          <Col xs={3} className="vote-count-column">
            {visible && (
              <span>{((votes[index]!! / totalVotes!!) * 100).toFixed(0)}%</span>
            )}
          </Col>
        </Row>
      </div>
    );
  });

  function handlePollClick(index: number) {
    if (!visible) {
      let items: (number | undefined)[] = [...votes];
      if (items[index] !== undefined) {
        items[index] = items[index]!! + 1;
      }
      setVotes(items);
      setTotalVotes(totalVotes!! + 1);

      setVisible(true);
    }
  }

  return (
    <div className="poll-component-section">
      {items}
      {visible && (
        <div className="after-answer-section">
          <div>Thank you for your answer!</div>
          <div>Total votes: {totalVotes}</div>
        </div>
      )}
    </div>
  );
};

export default DiscoverPoll;
