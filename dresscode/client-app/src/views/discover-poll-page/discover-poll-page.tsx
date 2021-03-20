import React, { useEffect, Fragment, useContext } from "react";
import PostStore from "../../app/stores/postStore";
import { observer } from "mobx-react-lite";
import DiscoverCard from "../../features/discover-card/discover-card";
import { RouteComponentProps } from "react-router-dom";
import { DiscoverProps } from "../commonProps";
import NoPosts from "../../features/no-posts/no-posts";
import LoadingComponent from "../../app/layout/LoadingComponent";

const DiscoverPollPage: React.FC<RouteComponentProps<DiscoverProps>> = ({
  match,
}) => {
  const postStore = useContext(PostStore);
  const { posts, loadingInitial, loadPosts, removeAllPosts } = postStore;

  useEffect(() => {
    loadPosts(match.path);
    return () => {
      removeAllPosts();
    };
  }, []);

  if (loadingInitial) {
    return <LoadingComponent />;
  }

  if (!posts) {
    return <NoPosts callerType="overview" />;
  }

  return (
    <Fragment>
      {posts?.map((poll) => (
        <DiscoverCard post={poll} key={poll.id} />
      ))}
    </Fragment>
  );
};

export default observer(DiscoverPollPage);
