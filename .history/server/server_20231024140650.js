import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
    destination: '/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
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

app.post('/',(req,res) => {
    console.log(req.res.req.file);
    upload()

    res.send('Namaste');
});