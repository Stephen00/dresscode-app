import React from "react";
import "./no-posts.css";

interface NoPostProps {
  callerType: string;
}

const NoPosts: React.FC<NoPostProps> = ({ callerType }) => {
  if (callerType === "overview") {
    return <h2 className="notfound">No posts in this category</h2>;
  }

  return <h2 className="notfound">Post not found</h2>;
};

export default NoPosts;
