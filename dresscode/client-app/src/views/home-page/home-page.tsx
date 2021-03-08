import React, { useEffect, useContext, Fragment } from "react";
import PostStore from "../../app/stores/postStore";
import { observer } from "mobx-react-lite";
import DiscoverCard from "../../features/discover-card/discover-card";
import "./home-page.css";
import CatPicture from "../../assets/cat.png";

const HomePage: React.FC = () => {
  const postStore = useContext(PostStore);
  const { loadAllPosts, removeAllPosts, filteredPosts } = postStore;

  useEffect(() => {
    if (!filteredPosts) {
      loadAllPosts();
    }
    return () => {
      removeAllPosts();
    };
  }, []);

  return (
    <div>
      {filteredPosts?.length ? 
        <div>
          <Fragment key="homepage">
          {filteredPosts?.map((post) => (
              <DiscoverCard post={post} key={post.id} />
          ))}
        </Fragment>
        </div>
        :
        <div className="empty-section-config">
          <img
            src={CatPicture}
            alt="no picture found"
            className="empty-section-image"
          />
          <h1 className="text-config">No Post Found</h1>
        </div>
      }
    </div>
    
  );
};

export default observer(HomePage);
