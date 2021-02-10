import React, { useEffect, Fragment, useContext } from "react";
import PostStore from "../../app/stores/postStore";
import { observer } from "mobx-react-lite";
import DiscoverCard from "../../features/discover-card/discover-card";
import { RouteComponentProps } from "react-router-dom";
import { DiscoverProps } from "../commonProps";

const DiscoverQuiz: React.FC<RouteComponentProps<DiscoverProps>> = ({
  match,
}) => {
  const postStore = useContext(PostStore);
  const {
    quizzes,
    loadPostsOfType: loadPosts,
    removePostsOfType: removeAllPosts,
  } = postStore;

  useEffect(() => {
    if (!quizzes) {
      loadPosts(match.path);
    }
    return () => {
      removeAllPosts(match.path);
    };
  }, []);

  return (
    <Fragment>
      {quizzes?.map((quiz) => (
        <DiscoverCard post={quiz} key={quiz.id} />
      ))}
    </Fragment>
  );
};

export default observer(DiscoverQuiz);
