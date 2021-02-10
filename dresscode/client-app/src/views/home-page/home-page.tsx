import React, { useEffect, Fragment, useContext } from "react";
import PostStore from "../../app/stores/postStore";
import { observer } from "mobx-react-lite";
import DiscoverCard from "../../features/discover-card/discover-card";

import "./home-page.css";

const HomePage = () => {
  const postStore = useContext(PostStore);
  const { posts, loadAllPosts, removeAllPosts } = postStore;

  useEffect(() => {
    if (!posts) {
      loadAllPosts();
    }
    return () => {
      removeAllPosts();
    };
  }, []);

  return (
    <Fragment>
      {posts?.map((post) => (
        <DiscoverCard post={post} key={post.id} />
      ))}
    </Fragment>
  );
};

export default observer(HomePage);
