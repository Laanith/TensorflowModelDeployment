import express from 'express';
import cors from 'cors';



const app = express();

app.listen(8000, () => {
    console.log("Server started on port 8000");
})

app.post('/', (req,res) => {
    console.log(req);
});