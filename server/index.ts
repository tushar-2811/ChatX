import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import IndexRouter from './routes/indexroute';

dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());

app.use('/' , IndexRouter);


const server = app.listen(process.env.PORT , () => {
    console.log(`The server is up on port : ${process.env.PORT}`);
})


