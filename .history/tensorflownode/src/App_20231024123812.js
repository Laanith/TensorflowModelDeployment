import React from "react";
import "./index.css";
import { useState, useRef } from "react";

function App() {

    const [file, setFile] = useState(null);
    return (
        <>
            <div>
                <h3>Input a hand drawn digit image</h3>
                <form>
                    <input type="file" accept="image/*" ></input>
                </form>
            </div>
        </>
    );

}

export default App;
