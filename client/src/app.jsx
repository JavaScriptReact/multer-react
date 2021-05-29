import React, { useEffect, useState } from "react";
import axios from "axios";

import Form from "./components/form";

const container = {
  width: "95vw",
  height: "auto",
  padding: 15,
  border: "solid 2px black",
  borderRadius: 20,
  position: "absolute",
  top: 100,
  left: "50%",
  transform: "translateX(-50%)",
};

const image_style = {
  height: 300,
  width: "19%",
  borderRadius: 25,
  marginLeft: 10,
};

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("/images")
      .then(({ data }) => {
        setData(data);
      })
      .catch((error) => alert(JSON.stringify(error, null, 2)));
  }, []);

  return (
    <>
      <Form />
      <section style={container}>
        {data.length !== 0 &&
          data.map((image) => {
            return <img style={image_style} src={image.path} alt="random" />;
          })}
      </section>
    </>
  );
}

export default App;
