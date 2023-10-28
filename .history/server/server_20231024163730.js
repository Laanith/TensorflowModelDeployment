import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import { error } from 'console';
import * as tf from '@tensorflow/tfjs';
import Jimp from 'jimp';
import { dirname } from "path";


import { fileURLToPath } from "url";

// Obtain the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Construct the absolute path to the model JSON file
const modelPath = path.resolve(__dirname, "models", "model.json");

const DEST = './uploads/'
let img = {};

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname + '_' + Date.now() + path.extname(file.originalname));
    }
});





function preProcess(image) {
  // const values = imageByteArray(image);
  const values = image.bitmap.data;
  const outShape = [1, image.bitmap.width, image.bitmap.height, 4];
  var input = tf.tensor4d(values, outShape, "float32");

  // Slice away alpha
  input = input.slice(
    [0, 0, 0, 0],
    [1, image.bitmap.width, image.bitmap.height, 3]
  );

  return input;
}


const upload = multer({
    storage: storage
}).single("file")

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));



app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(8000, () => {
    console.log("Server started on port 8000");
})

app.post('/', (req, res) => {
    upload(req, res, (err) => { 
        if (err) {
            console.error(error);
        }
        console.log(req.file.filename);
        
        const path = DEST + req.file.filename;
        const newPath = './written/' + req.file.filename;
        Jimp.read(path)
            .then((image) => {
                 
                console.log('Width :', image.bitmap.width);
                console.log("Height :", image.bitmap.height);
                image.resize(28, 28, Jimp.RESIZE_BICUBIC);
                console.log("Width :", image.bitmap.width);
                console.log("Height :", image.bitmap.height);
                let X = preProcess(image)
                console.log("Channels :", X.shape);
                const modelPath = path.resolve(__dirname, "models", "model.json");
                const model = tf.loadLayersModel(modelPath);
                console.log(typeof (model));
        })
        
     });
    res.send('Namaste');
});