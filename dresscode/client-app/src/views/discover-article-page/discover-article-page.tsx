import React, { useEffect, Fragment, useContext } from "react";
import PostStore from "../../app/stores/postStore";
import { RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react-lite";
import DiscoverCard from "../../features/discover-card/discover-card";
import { DiscoverProps } from "../commonProps";
import NoPosts from "../../features/no-posts/no-posts";
import LoadingComponent from "../../app/layout/LoadingComponent";

const DiscoverArticle: React.FC<RouteComponentProps<DiscoverProps>> = ({
  match,
}) => {
  const postStore = useContext(PostStore);
  const {
    articles,
    loadingInitial,
    loadPostsOfType: loadPosts,
    removePostsOfType: removeAllPosts,
  } = postStore;

  useEffect(() => {
    if (!articles) {
      loadPosts(match.path);
    }
    return () => {
      removeAllPosts(match.path);
    };
  }, []);

  if (loadingInitial) {
    return <LoadingComponent />;
  }

  if (!articles) {
    return <NoPosts callerType="overview" />;
  }

  return (
    <Fragment>
      {articles?.map((article) => (
        <DiscoverCard post={article} key={article.id} />
      ))}
    </Fragment>
  );
};

export default observer(DiscoverArticle);
