import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose';


const URI: string = process.env.MONGO_URL || "mongodb+srv://tusharrawat52:lSyJk6ZrkfesyxpL@cluster0.tz8zdjw.mongodb.net/Messenger-app?retryWrites=true&w=majority"



dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());

mongoose.connect(URI)
.then(() => {
    console.log("Connected to Database");
})
.catch((err) => {
    console.log(`error in connecting to database-> ${err}`);
})


const server = app.listen(process.env.PORT , () => {
    console.log(`The server is up on port : ${process.env.PORT}`);
})

