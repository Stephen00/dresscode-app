import React, { useState, useContext } from "react";
import "./discover-poll.css";
import PostStore from "../../app/stores/postStore";
import { PollComponentProps } from "../../views/commonProps";
import AnswerOption from "../answer-option-layout/answer-option-layout";

const DiscoverPoll: React.FC<PollComponentProps> = ({ poll }) => {
  const postStore = useContext(PostStore);
  const { voteInPoll } = postStore;

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
    return vote !== undefined && vote != null;
  });

  var initialTotalVotes = initialVotes.reduce((a, b) => a!! + b!!, 0);

  const [visible, setVisible] = useState<boolean>(false);
  const [votes, setVotesLocally] = useState<(number | undefined)[]>(
    initialVotes
  );
  const [totalVotes, setTotalVotesLocally] = useState<number | undefined>(
    initialTotalVotes
  );

  function onVotesChange(optionIndex: number, pollIndex: number) {
    let items: (number | undefined)[] = [...votes];
    if (items[optionIndex] !== undefined && answers[optionIndex] !== undefined) {
      items[optionIndex] = items[optionIndex]!! + 1;
      voteInPoll(poll.pk, answers[optionIndex]!!);
      setVotesLocally(items);
      setTotalVotesLocally(totalVotes!! + 1);
      setVisible(true);
    }
  }

  const items: any = [];
  answers.forEach((option, index) => {
    items.push(
      <AnswerOption
        postType="poll"
        postIndex={poll.pk}
        isAnswered={visible}
        key={index}
        optionIndex={index}
        option={option!!}
        optionCounts={votes[index]!!}
        onOptionSelected={onVotesChange}
        totalVotes={totalVotes!!}
      />
    );
  });

  return (
    <div className={`poll-component-section ${visible ? "answered" : ""}`}>
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
