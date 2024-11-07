import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: Number,
            required: true
        },
        postedBy: {
            type: String,
            
        },
        bookPin: {
            type: String,
            required: true,
            validate: {
                validator: function(v) {
                    return /^\d{4}$/.test(v); // Ensures exactly 4 digits
                },
                message: props => `${props.value} is not a valid 4-digit PIN!`
            }
        }
    },
    {
        timestamps: true,
    }
);

export const Book = mongoose.model('books', bookSchema);