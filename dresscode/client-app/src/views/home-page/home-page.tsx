import React, { useEffect, Fragment, useContext } from "react";
import PostStore from "../../app/stores/postStore";
import { observer } from "mobx-react-lite";
import DiscoverCard from "../../features/discover-card/discover-card";

import "./home-page.css";

const HomePage: React.FC = () => {
  const postStore = useContext(PostStore);
  const { posts, loadPosts, removeAllPosts } = postStore;

  useEffect(() => {
    loadPosts();
    return () => {
      removeAllPosts();
    };
  }, []);

  return (
    <Fragment key="homepage">
      {posts?.map((post) => (
        <DiscoverCard post={post} key={post.id} />
      ))}
    </Fragment>
  );
};

export default observer(HomePage);
