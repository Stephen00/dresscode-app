import React, { useState } from "react";
import "./discover-poll.css";
import { Card, Col, Row, Button } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";

type DiscoverPollProps = {
  answers: (string)[],
  votes: (number)[],
  total_votes: (number)
}

const DiscoverPoll = ({answers, votes, total_votes}: DiscoverPollProps) => {
  const [visible, setVisible] = useState<Boolean>(false)
  const [answer, setAnswer] = useState<string[]>(answers)
  const [vote, setVote] = useState<number[]>(votes)
  const [total_vote, setTotal_vote] = useState<number>(total_votes)

  const items: any = []
  answer.forEach((value, index) => {
    items.push(
      <div key={index}>
        <Row className="vote-row">
          <Col xs={3} className="vote-button-column">
            <Button className="poll-button  float-right" onClick={() => handlePollClick(index)}></Button>
          </Col>
          <Col xs={6} className="vote-answer-column">
            <h5>{value}, {vote[index]}, {total_vote}, {String(visible)}</h5>
          </Col>
          <Col xs={3} className="vote-count-column">
            {visible && <h5>{((vote[index] / total_vote) * 100).toFixed(0)}%</h5>}
          </Col>
        </Row>
      </div>
    )
  })

  function handlePollClick (index: number) {
    if (!visible) {
      setTotal_vote(total_vote + 1)

      let items:number[] = [...vote];
      items[index] += 1
      setVote(items);
  
      setVisible(true)
    }
  }

  return (
    <div className="poll-component-section">
      {visible && <h5>Thank you for answering the poll.</h5>}
      {items}
      {visible && <h5 className="total-vote-section">Total vote: {total_vote}</h5>}
    </div>
  )

};

export default DiscoverPoll;