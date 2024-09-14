import express, { request, response } from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { PORT } from './config.js'
import { Book } from './models/bookModel.js'
import bookRoute from './routes/booksRoute.js'
import cors from 'cors'


dotenv.config();

const mongoDBURL = process.env.MONGODB_URL;

const app = express()

// Middlewear for parsing reqyest body
app.use(express.json());

//Middlewear for handling cors policy
app.use(cors());


app.get('/', (request, response) => {
    console.log(request)
    return response.status(200).send('Welcome to my page')
});

app.use('/books', bookRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });