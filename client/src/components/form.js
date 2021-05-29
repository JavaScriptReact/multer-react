import React, { useRef } from "react";

function Form() {
  const file = useRef(null);

  return (
    <>
      <form
        action="/"
        method="post"
        encType="multipart/form-data"
        style={{ display: "flex", height: 20, alignItems: "center" }}
      >
        <input type="file" name="image" ref={file} />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Form;
