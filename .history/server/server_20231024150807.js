import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import { error } from 'console';
import * as tf from '@tensorflow/tfjs';
import Jimp from 'jimp';


let img = {};

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname + '_' + Date.now() + path.extname(file.originalname));
    }
});


const upload = multer({
    storage: storage
}).single("file")

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

app.listen(8000, () => {
    console.log("Server started on port 8000");
})

app.post('/', (req, res) => {
    upload(req, res, (err) => { 
        if (err) {
            console.error(error);
        }

        // console.log(req.file);
        console.log(res);
     });
    res.send('Namaste');
});