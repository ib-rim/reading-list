import Book from '../../models/bookModel'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const book = await Book.create(req.body);
            res.status(200).json(book);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message })
        }
    }
}
