import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import * as tf from "@tensorflow/tfjs";
import Jimp from "jimp";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const modelPath = path.resolve(__dirname, "models", "model.json");
const DEST = "./uploads/";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});

async function loadModelAndPredict(X, modelPath) {
  try {
    const refinedModel = await tf.loadLayersModel(modelPath);
    const pred = refinedModel.predict(X).arraySync();
    const predictedClass = findIndexOfMaxValue(pred[0]);
    return predictedClass;
  } catch (error) {
    throw error;
  }
}

function findIndexOfMaxValue(arr) {
  const max = Math.max(...arr);
  const maxIndex = arr.indexOf(max);
  return maxIndex;
}

async function processImageAndPredict(PATH, modelPath) {
  try {
    const image = await Jimp.read(PATH);
    image.resize(28, 28, Jimp.RESIZE_BICUBIC);
    let X = preProcess(image);
    X = X.mean(3);
    X = X.reshape([784]);
    X = X.reshape([1, 784]);

    const predictedClass = await loadModelAndPredict(X, modelPath);
    return predictedClass;
  } catch (error) {
    throw error;
  }
}


function preProcess(image) {
  // Convert the image to grayscale
  image = image.grayscale();

  // Resize the image to the desired dimensions
  image = image.resize(28, 28);

  // Convert the image to a TensorFlow tensor
  const values = image.bitmap.data;
  const outShape = [1, 28, 28, 1];
  const input = tf.tensor4d(values, outShape, "float32");

  return input;
}



const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Create the multer upload middleware
const upload = multer({
  storage: storage,
}).single("file");

app.post("/", (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error occurred during upload.");
      return;
    }

    const PATH = DEST + req.file.filename;
    const WRITEPATH = "./written/" + req.file.filename;

    processImageAndPredict(PATH, modelPath)
      .then((predictedClass) => {
        console.log("Predicted class : ", predictedClass);
        res.send("Predicted class: " + predictedClass);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error occurred during prediction.");
      });
  });
});
