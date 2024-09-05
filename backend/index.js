import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import {PORT} from "./config.js"

dotenv.config();

const mongoDBURL = process.env.MONGODB_URL;

const app = express()

app.get('/', (request, response) => {
    console.log(request)
    return response.status(200).send('Welcome to my page')
});

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