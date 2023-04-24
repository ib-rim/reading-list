import Book from '../../models/bookModel'
import dbConnect from '../../lib/dbConnect';

export default async function handler(req, res) {
    await dbConnect();
    if (req.method === 'POST') {
        try {
            const book = await Book.create(req.body);
            res.status(200).json(book);
        } catch (error) {
            console.log(error.message);
            if (error.message.includes("validation failed")) {
                res.status(400).json({ message: error.message })
            }
            else {
                res.status(500).json({ message: error.message })
            }
        }
    }
}
