import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import { error, log } from "console";
import * as tf from "@tensorflow/tfjs";
import Jimp from "jimp";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Obtain the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Construct the absolute path to the model JSON file
const modelPath = path.resolve(__dirname, "models", "model.json");

const DEST = "./uploads/";
let img = {};

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
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
  storage: storage,
}).single("file");

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
});

async function PredictOutput(X, modelPath) {
  let prediction;
  const model = await tf.loadLayersModel(modelPath).then((refinedModel) => {
    let pred = refinedModel.predict(X).arraySync();
    // console.log(pred[0]);
    let PREDICTION = findIndexOfMaxValue(pred[0]);
    // console.log('Predicted class : ', findIndexOfMaxValue(pred[0]));
    prediction = PREDICTION;
  });
  console.log('Predictoutput perdiction :', prediction);
  return prediction;
}

function findIndexOfMaxValue(arr) {
  const max = Math.max(...arr);
  const maxIndex = arr.indexOf(max);
  return maxIndex;
}

async function MakePrediction(X, modelPath) {
  return await PredictOutput(X, modelPath);
}

async function ModelLoader(PATH) {
   Jimp.read(PATH).then(async (image) => {
    image.resize(28, 28, Jimp.RESIZE_BICUBIC);
    let X = preProcess(image);
    X = X.mean(3);
    X = X.reshape([784]);
    X = X.reshape([1, 784]);
     const modelPath = `https://raw.githubusercontent.com/Laanith/tfjs/main/model.json`;
     const noneee = await MakePrediction(X, modelPath);
     console.log('Result in Model Loader :',  noneee);
     return noneee;
  });

  // return prediction;
}

app.post("/", (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(error);
    }
    console.log(req.file.filename);

    const PATH = DEST + req.file.filename;
    const WRITEPATH = "./written/" + req.file.filename;

    const dayum = await ModelLoader(PATH);
    console.log('Result in upload : ', dayum);

    // await ModelLoader(PATH)
    //   .then((pred) => {
    //     console.log("Predicted class in ModelLoader: ", pred);
    // res.send("Predicted class: " + pred);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     res.status(500).send("Error occurred during prediction.");
    //   });
  });
  // res.send("Namaste");
});
