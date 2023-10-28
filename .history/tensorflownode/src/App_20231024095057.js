import React from "react";
import "./index.css";
import { useState, useRef } from "react";

function App() {
  const [file, setFile] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const handleUpload = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setUploaded(true);
  };

  return (
    <div className="flex w-full my-[50px] justify-center">
      <form>
        <h3>Input a hand-drawn image input</h3>
        <input
          type="file"
          accept="image/*"
          name="image-input"
          required
          onChange={handleUpload}
        ></input>
      </form>
      <br></br>
      <div id="imgpreview" className="block">
        {!uploaded && (
          <img
            className="w-[400px] h-[400px] object-cover"
            src="/upload.jpg"
          ></img>
        )}
        {uploaded && (
          <img
            className="w-[400px] h-[400px] object-cover"
            src={URL.createObjectURL(file)}
          ></img>
        )}
      </div>
    </div>
  );
}

export default App;
