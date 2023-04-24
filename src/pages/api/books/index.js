import dbConnect from '@/pages/lib/dbConnect';
import Book from '../../../models/bookModel';

export default async function handler(req, res) {
    await dbConnect();
    if (req.method === 'GET') {
        try {
            const books = await Book.find({});
            console.log(books);
            res.status(200).json(books);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message })
        }
    }
}
