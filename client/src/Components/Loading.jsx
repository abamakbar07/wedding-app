import React from "react";

const Loading = (props) => {
  const loading = props.isLoading;

  return (
    <div className={loading ? "Loading" : "hidden"}>
      <div className="uil-ring-css" style={{ transform: "scale(0.79)" }}>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
