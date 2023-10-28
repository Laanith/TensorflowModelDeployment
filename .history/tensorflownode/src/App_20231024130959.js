import React from "react";
import "./index.css";
import { useState, useRef } from "react";
import axios from 'axios';

function App() {

    const [file, setFile] = useState(null);
    const [uploaded, setUploaded] = useState(false);
    const [FDUpdated, setFDUpdated] = useState(false);
    const [responseStatus, setResponseStatus] = useState(404);
    const [msg, setResponseMsg] = useState("");

    const handleUpload = (event) => {
        event.preventDefault();
        let f = event.target.files[0];
        setUploaded(true);
        setFile(f);
    }


    const handleClick = async (event) => {
        event.preventDefault();
        if (!file) {
            console.log('No file selected');
            return;
        }

        const FD = new FormData();
        FD.append('file', file);
        for (var key of FD.entries()) {
            console.log(key[0] + ", " + key[1]);
        }

        setFDUpdated(true);

        axios.post('http://localhost:8000', FD, {
            onUploadProgress: (progressEvent) => { console.log(progressEvent.progress * 100); },
            headers: {
                "Custom-Header": "value"
            }
        }).then(res => { console.log(res.data); setResponseStatus(res.status); setResponseMsg(res.data);  })
        .catch((error) => { console.error(error) });


    }
    
    return (
      <>
        <div>
          <h3>Input a hand drawn digit image</h3>
          <form encType="multipart/form-data">
            <input type="file" accept="image/*" onChange={handleUpload}></input>
            <button
              className="submitButton"
              type="submit"
              onClick={handleClick}
            >
              Submit
            </button>
          </form>

          <br></br>
          {!uploaded && (
            <img
              src="/upload.jpg"
              alt="upload"
              style={{
                width: 400,
                height: 400,
                objectFit: "contain",
              }}
            ></img>
          )}
          {uploaded && (
            <img
              src={URL.createObjectURL(file)}
              style={{
                width: 400,
                height: 400,
                objectFit: "contain",
              }}
              alt="uploaded"
            ></img>
          )}
          <br></br>
          <br></br>
          {uploaded && <p>Upload status : Uploaded !</p>}
                {FDUpdated && <p>FD status : Updated !</p>}
                <p>Response status : {responseStatus}</p>  
                 (msg==="") ? (<></>) : (<p>Response Message : </p>) 
        </div>
      </>
    );

}

export default App;
