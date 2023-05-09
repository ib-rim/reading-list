import dbConnect from '@/lib/dbConnect';
import Book from '../../../models/bookModel';

export default async function handler(req, res) {
    await dbConnect();
    const id = req.query.id;

    if (req.method === 'GET') {
        try {
            const book = await Book.findById(id);
            if (!book) {
                res.status(404).json({ message: `Book with ID ${id} not found` });
            }
            else {
                res.status(200).json(book);
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message })
        }
    }
    else if (req.method === 'PUT' || req.method === 'PATCH') {
        try {
            let book = await Book.findByIdAndUpdate(id, req.body);
            if (!book) {
                res.status(404).json({ message: `Book with ID ${id} not found` });
            }
            else {
                book = await Book.findById(id);
                res.status(200).json(book);
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message });
        }
    }
    else if (req.method === 'DELETE') {
        try {
            const book = await Book.findByIdAndDelete(id);
            if (!book) {
                res.status(404).json({ message: `Book with ID ${id} not found` });
            }
            else {
                res.status(200).json(book);
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message });
        }
    }
}
