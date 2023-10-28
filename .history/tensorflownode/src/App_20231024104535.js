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


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http:localhost:8000/', {
        method: "POST",
        headers: {
          'Content-type' : "application/json"
        }, 
        body : JSON.stringify(formdata)
        
      })
    }
  }

  return (
    <div className="flex w-full my-[50px] justify-center">
      <form onSubmit={handleSubmit}>
        <h3>Input a hand-drawn image input</h3>
        <input
          type="file"
          accept="image/*"
          name="image-input"
          required
          onChange={handleUpload}
        ></input>
        <button type="submit" className="submitButton">Submit</button>
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
