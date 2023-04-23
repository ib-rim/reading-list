import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "No title given"]
        },
        author: {
            type: String,
            required: [true, "No author given"]
        },
        status: {
            type: String,
            default: "Unread"
        },
        started: {
            type: Date,
        },
        finished: {
            type: Date,
        },
    }
)

export default mongoose.models.Book || mongoose.model('Book', bookSchema);