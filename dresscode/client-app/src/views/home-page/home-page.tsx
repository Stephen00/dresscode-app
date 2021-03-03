import React, { useEffect, Fragment, useContext, useState } from "react";
import PostStore from "../../app/stores/postStore";
import { observer } from "mobx-react-lite";
import DiscoverCard from "../../features/discover-card/discover-card";
import { InputGroup, FormControl } from "react-bootstrap";

import "./home-page.css";

const HomePage: React.FC = () => {
  const postStore = useContext(PostStore);
  const { posts, loadAllPosts, removeAllPosts, showFilteredResults } = postStore;

  useEffect(() => {
    if (!posts) {
      showFilteredResults();
    }
    return () => {
      removeAllPosts();
    };
  }, []);

  const getSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    postStore.getSearchValue(event.target.value)
  }

  return (
    <div>
      <div className="search-input-row">
        <InputGroup className="mb-3">
          <FormControl
              className="search-input"
              placeholder="search ..."
              onChange={getSearch}
          />
        </InputGroup>
      </div>
      {posts?.map((post) => (
          <DiscoverCard post={post} key={post.id} />
      ))}
    </div>
  );
};

export default observer(HomePage);
