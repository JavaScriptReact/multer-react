import React from "react";
import ReactDom from "react-dom";
import App from "./app";

function Application() {
  return (
    <>
      <App />
    </>
  );
}

ReactDom.render(
  <>
    <Application />
  </>,
  document.getElementById("root")
);
