import React, { useEffect, Fragment, useContext } from "react";
import PostStore from "../../app/stores/postStore";
import { RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react-lite";
import DiscoverCard from "../../features/discover-card/discover-card";
import { DiscoverProps } from "../commonProps";

const DiscoverArticle: React.FC<RouteComponentProps<DiscoverProps>> = ({
  match,
}) => {
  const postStore = useContext(PostStore);
  const {
    articles,
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

  return (
    <Fragment>
      {articles?.map((article) => (
        <DiscoverCard post={article} key={article.id} />
      ))}
    </Fragment>
  );
};

export default observer(DiscoverArticle);
