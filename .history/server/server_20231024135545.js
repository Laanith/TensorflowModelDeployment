import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
const upload = multer({ dest: "uploads/" });



const storage = multer.diskStorage({
    destination: '/uploads/',
    filename: function (req, file, cb) {
        cb(null,);
    }
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000" }));

app.listen(8000, () => {
    console.log("Server started on port 8000");
})

app.post('/',upload.single("file"),(req,res) => {
    console.log(req.res.req.file);
    // console.log(req.file);
    // console.log(req);
    res.send('Namaste');
});