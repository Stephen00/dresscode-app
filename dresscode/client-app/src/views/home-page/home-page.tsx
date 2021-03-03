import React, { useEffect, useContext, Fragment } from "react";
import PostStore from "../../app/stores/postStore";
import { observer } from "mobx-react-lite";
import DiscoverCard from "../../features/discover-card/discover-card";
import "./home-page.css";

const HomePage: React.FC = () => {
  const postStore = useContext(PostStore);
  const { loadAllPosts, posts, removeAllPosts, filteredPosts } = postStore;

  useEffect(() => {
    if (!filteredPosts) {
      loadAllPosts();
    }
    return () => {
      removeAllPosts();
    };
  }, []);

  return (
    <Fragment key="homepage">
      {filteredPosts?.map((post) => (
          <DiscoverCard post={post} key={post.id} />
      ))}
    </Fragment>
  );
};

export default observer(HomePage);
