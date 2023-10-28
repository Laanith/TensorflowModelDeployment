import React from "react";
import "./index.css";
import { useState, useRef } from "react";

function App() {

    const [file, setFile] = useState(null);
    const [uploaded, setUploaded] = useState(false);

    const handleUpload = (event) => {
        event.preventDefault();
        let f = event.target.files[0];
        console.log(f);
        setUploaded(true);

    }
    return (
        <>
            <div>
                <h3>Input a hand drawn digit image</h3>
                <form>
                    <input type="file" accept="image/*" onChange={handleUpload} ></input>
                </form>

                <br></br>
                {!uploaded && <img src='/upload.png'></img>}

            </div>
        </>
    );

}

export default App;
