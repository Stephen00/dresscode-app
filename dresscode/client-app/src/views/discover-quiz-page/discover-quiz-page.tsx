import React, { useEffect, Fragment, useContext } from "react";
import PostStore from "../../app/stores/postStore";
import { observer } from "mobx-react-lite";
import DiscoverCard from "../../features/discover-card/discover-card";
import { RouteComponentProps } from "react-router-dom";
import { DiscoverProps } from "../commonProps";
import NoPosts from "../../features/no-posts/no-posts";
import LoadingComponent from "../../app/layout/LoadingComponent";

const DiscoverQuiz: React.FC<RouteComponentProps<DiscoverProps>> = ({
  match,
}) => {
  const postStore = useContext(PostStore);
  const {
    quizzes,
    loadingInitial,
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

  if (loadingInitial) {
    return <LoadingComponent />;
  }

  if (!quizzes) {
    return <NoPosts callerType="overview" />;
  }

  return (
    <Fragment>
      {quizzes?.map((quiz) => (
        <DiscoverCard post={quiz} key={quiz.id} />
      ))}
    </Fragment>
  );
};

export default observer(DiscoverQuiz);
