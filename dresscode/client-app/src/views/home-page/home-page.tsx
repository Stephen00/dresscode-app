import React, { useEffect, Fragment, useContext, useState } from "react";
import PostStore from "../../app/stores/postStore";
import { observer } from "mobx-react-lite";
import DiscoverCard from "../../features/discover-card/discover-card";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { DiscoverCardProps } from "../../views/commonProps";
import { IPost } from "../../app/models/post";

import "./home-page.css";

const HomePage: React.FC = () => {
  const postStore = useContext(PostStore);
  const { posts, loadAllPosts, removeAllPosts } = postStore;
  const [inputValue, setInputValue] = useState<string>("");
  const [allPosts, setAllPosts] = useState<IPost[]>();

  useEffect(() => {
    if (!posts) {
      loadAllPosts();
    }
    return () => {
      removeAllPosts();
    };
  }, []);

  function onSearch() {
    var filterPost: IPost[];

    filterPost = posts!!.filter((item, index) => {
                                                    var title: string = item.content.title.toLowerCase();
                                                    var searchIndex: number = title.search(inputValue)
                                                    
                                                    if (searchIndex >= 0) {
                                                      return item
                                                    }
                                                  })
    setAllPosts(filterPost)
  }

  return (
    <div>
      {/* <input
        type="text"
        value={inputValue}
        onChange={(
            ev: React.ChangeEvent<HTMLInputElement>,
        ) => {
          setInputValue(ev.target.value)
          onSearch()
        }
      }/> */}
      <div className="search-input-row">
        <InputGroup className="mb-3">
          <FormControl
              className="search-input"
              placeholder="search ..."
              onChange={(
                ev: React.ChangeEvent<HTMLInputElement>,
              ) => {
                setInputValue(ev.target.value)
                onSearch()
              }
            }
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
