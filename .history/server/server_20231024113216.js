import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
const upload = multer({ dest: "uploads/" });



const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(8000, () => {
    console.log("Server started on port 8000");
})

app.post('/', upload.single("image"),(req,res) => {
    console.log(req.body);
    res.send('Namaste');
});