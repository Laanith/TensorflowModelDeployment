import React from "react";
import "./index.css";
import { useState, useRef } from "react";

function App() {
  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({ data: "" });
  const [message, setMessage] = useState("");

    const [uploaded, setUploaded] = useState(false);
    
    const handleUpload = (e) => {
        e.preventDefault();
        const selectedFile = e.target.files[0];
        console.log(selectedFile);
        console.log(selectedFile.name);
        console.log(selectedFile.lastModified);
        console.log(selectedFile.lastModifiedDate);
        console.log(selectedFile.webkitRelativePath);
        console.log(selectedFile.size);


        // console.log(typeof (selectedFile));
        setFile(selectedFile);
        setUploaded(true);
        // const updatedFormData = new FormData(); 
        // setFormData(updatedFormData);

    };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Data sent succesfully");
      } else {
        setMessage("Data not sent !");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex w-full my-[50px] justify-center">
      <form encType="multipart/form-data">
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
            alt="none"
            className="w-[400px] h-[400px] object-cover"
            src="/upload.jpg"
          ></img>
        )}
        {uploaded && (
          <img
            alt="none"
            className="w-[400px] h-[400px] object-cover"
            src={URL.createObjectURL(file)}
          ></img>
        )}
      </div>
      <br></br>
      <br></br>
      <br></br>
      <p>{message}</p>
    </div>
  );
}

export default App;
