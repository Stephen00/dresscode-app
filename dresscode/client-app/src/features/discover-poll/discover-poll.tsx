import React from "react";
import "./discover-poll.css";
import { Card, Col, Row, Button } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";

type DiscoverPollProps = {
  answers: (string | undefined)[],
  votes: (number | undefined)[]
}

const DiscoverPoll = ({answers, votes}: DiscoverPollProps) => {
  var new_answers: String[] = []
  var new_votes: number[] = []
  var total_votes: number = 0

  answers.forEach(function (value, index) {
    if (answers[index] !== null) {
      new_answers.push(String(answers[index]))
      new_votes.push(Number(votes[index]))
      total_votes += Number(votes[index])
    }
  });

  const items: any = []
  new_answers.forEach((value, index) => {
    items.push(
      <div key={index}>
        <Row className="vote-row">
          <Col xs={4} className="vote-button-column">
            <Button className="poll-button" onClick={handlePollClick}></Button>
          </Col>
          <Col xs={4} className="vote-answer-column">
            <h5>{value}</h5>
          </Col>
          <Col xs={4} className="vote-count-column">
            {((new_votes[index] / total_votes) * 100).toFixed(0)}
          </Col>
        </Row>
      </div>
    )
  })

  var state = { isClick: false, isExecute: false }

  function handlePollClick() {
    console.log("handlePollClick()")
    console.log("isClick:", state.isClick)
  }

  return (
    <div className="poll-component-section">
      <h5>Thank you for answering the poll.</h5>
      {items}
      <h5 className="total-vote-section">Total vote: {total_votes}</h5>
    </div>
  )

};

export default DiscoverPoll;