import express from 'express';
import cors from 'cors';
import bodyParser, { BodyParser } from 'body-parser';




const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(8000, () => {
    console.log("Server started on port 8000");
})

app.post('/', (req,res) => {
    console.log(req);
});