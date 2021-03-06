import React, { useState, useEffect, Fragment, useContext } from "react";
import PostStore from "../../app/stores/postStore";
import { observer } from "mobx-react-lite";
import DiscoverCard from "../../features/discover-card/discover-card";
import "./home-page.css";
import { Spinner } from "react-bootstrap";
import LoadingComponent from "../../app/layout/LoadingComponent";
import InfiniteScroll from "react-infinite-scroller";
import NoPosts from "../../features/no-posts/no-posts";

const HomePage: React.FC = () => {
  const postStore = useContext(PostStore);
  const {
    loadingInitial,
    loadPosts,
    removeAllPosts,
    hasMorePosts,
    lastPostId,
    removeLastLoadedPost,
    filteredPosts,
  } = postStore;
  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    loadPosts().then(() => {
      setLoadingNext(false);
    });
  };

  useEffect(() => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
    loadPosts();
    return () => {
      removeAllPosts();
      removeLastLoadedPost();
    };
  }, []);

  // lastPostId is set after the first request
  // Now the loading indicator for the whole page
  // will only be displayed on the initial load
  if (loadingInitial && !lastPostId) {
    return <LoadingComponent />;
  }

  return (
    <Fragment key="homepage">
      <InfiniteScroll
        pageStart={0}
        loadMore={handleGetNext}
        hasMore={!loadingNext && hasMorePosts}
        // because we use useEffect for the initial batch of posts
        initialLoad={false}
      >
        {filteredPosts?.length ? (
          filteredPosts?.map((post) => (
            <DiscoverCard post={post} key={post.id} />
          ))
        ) : (
          <NoPosts callerType="home" />
        )}
      </InfiniteScroll>

      {loadingNext && (
        <div className="spinner-wrapper">
          <Spinner animation="border" className="spinner" />
        </div>
      )}
    </Fragment>
  );
};

export default observer(HomePage);
