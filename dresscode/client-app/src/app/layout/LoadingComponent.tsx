import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingComponent: React.FC = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Spinner animation="border" className="spinner" />
    </div>
  );
};

export default LoadingComponent;
