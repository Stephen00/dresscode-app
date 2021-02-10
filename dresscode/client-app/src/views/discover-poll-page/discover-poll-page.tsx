import React, { useEffect, Fragment, useContext } from "react";
import PostStore from "../../app/stores/postStore";
import { observer } from "mobx-react-lite";
import DiscoverCard from "../../features/discover-card/discover-card";
import { RouteComponentProps } from "react-router-dom";
import { DiscoverProps } from "../commonProps";

const DiscoverPollPage: React.FC<RouteComponentProps<DiscoverProps>> = ({
  match,
}) => {
  const postStore = useContext(PostStore);
  const {
    polls,
    loadPostsOfType: loadPosts,
    removePostsOfType: removeAllPosts,
  } = postStore;

  useEffect(() => {
    if (!polls) {
      loadPosts(match.path);
    }
    return () => {
      removeAllPosts(match.path);
    };
  }, []);

  return (
    <Fragment>
      {polls?.map((poll) => (
        <DiscoverCard post={poll} key={poll.id} />
      ))}
    </Fragment>
  );
};

export default observer(DiscoverPollPage);
