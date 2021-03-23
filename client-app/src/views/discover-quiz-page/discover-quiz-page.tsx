import React, { useEffect, Fragment, useContext, useState } from "react";
import PostStore from "../../app/stores/postStore";
import { observer } from "mobx-react-lite";
import DiscoverCard from "../../features/discover-card/discover-card";
import { RouteComponentProps } from "react-router-dom";
import { DiscoverProps } from "../commonProps";
import NoPosts from "../../features/no-posts/no-posts";
import LoadingComponent from "../../app/layout/LoadingComponent";
import InfiniteScroll from "react-infinite-scroller";
import { Spinner } from "react-bootstrap";

const DiscoverQuiz: React.FC<RouteComponentProps<DiscoverProps>> = ({
  match,
}) => {
  const postStore = useContext(PostStore);
  const {
    posts,
    loadingInitial,
    loadPosts,
    removeAllPosts,
    hasMorePosts,
    lastPostId,
    removeLastLoadedPost,
  } = postStore;

  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    loadPosts(match.path).then(() => {
      setLoadingNext(false);
    });
  };

  useEffect(() => {
    loadPosts(match.path);
    return () => {
      removeAllPosts();
      removeLastLoadedPost();
    };
  }, []);

  if (loadingInitial && !lastPostId) {
    return <LoadingComponent />;
  }

  if (!posts) {
    return <NoPosts callerType="overview" />;
  }

  return (
    <Fragment>
      <InfiniteScroll
        pageStart={0}
        loadMore={handleGetNext}
        hasMore={!loadingNext && hasMorePosts}
        // because we use useEffect for the initial batch of posts
        initialLoad={false}
      >
        {posts?.map((quiz) => (
          <DiscoverCard post={quiz} key={quiz.id} />
        ))}
      </InfiniteScroll>

      {loadingNext && (
        <div className="spinner-wrapper">
          <Spinner animation="border" className="spinner" />
        </div>
      )}
    </Fragment>
  );
};

export default observer(DiscoverQuiz);
