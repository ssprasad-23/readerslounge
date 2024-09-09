import express, { response } from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import { PORT } from "./config.js"
import { Book } from './models/bookModel.js'

dotenv.config();

const mongoDBURL = process.env.MONGODB_URL;

const app = express()

// Middlewear for parsing reqyest body
app.use(express.json());


app.get('/', (request, response) => {
    console.log(request)
    return response.status(200).send('Welcome to my page')
});

//Route for Save a new Book
app.post('/books', async (request, response) => {
    try{
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author:request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

// routes to Get All Boobs from database
app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.messsage);
        response.status(500).send({ message: error.message });
    }
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