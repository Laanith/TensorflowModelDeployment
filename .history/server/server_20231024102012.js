import express from 'express';
import cors from 'cors';



const app = express();

app.listen(3000, () => {
    console.log("Server started on port 3000");
})

app.post('/image', (req,res) => {
    console.log(req);
});