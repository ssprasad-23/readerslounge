import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();


//Route for Save a new Book
router.post('/', async (request, response) => {
    try{
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear ||
            !request.body.postedBy
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear, postedBy',
            });
        }
        const newBook = {
            title: request.body.title,
            author:request.body.author,
            publishYear: request.body.publishYear,
            postedBy: request.body.postedBy
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

// routes to Get All Boobs from database
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// routes to Get One Book from database by id
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//route for Update a book
router.put('/:id', async (request, response) => {
    try{
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear ||
            !request.body.postedBy
        ){
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear, postedBy',
            });
        }

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result){
            return response.status(404).json({ message: 'Book not found'});
        }
        return response.status(200).send({ message: "Book updated successfully"});
    }   catch(error){
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//routes for deleting a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).send({ messgae: 'Book deleted successfully' })

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;