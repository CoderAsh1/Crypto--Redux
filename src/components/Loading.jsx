import React from "react";
import loadingIcon from "../assets/Rolling.svg";

const Loading = () => {
  return (
    <div className="loading">
      <img src={loadingIcon} width="50px" />
    </div>
  );
};

export default Loading;
