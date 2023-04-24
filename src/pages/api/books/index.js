import dbConnect from '@/lib/dbConnect';
import Book from '../../../models/bookModel';

export default async function handler(req, res) {
    await dbConnect();
    const title = req.query.title;
    const author = req.query.author;
    const status = req.query.status;

    if (req.method === 'GET') {
        try {
            const books = await Book.find({});

            //Filter books if query parameter provided
            if (title || author || status) {
                const filteredBooks = [];
                books.forEach(book => {
                    if ((!title || book.title.toLowerCase() === title.toLowerCase())
                        && (!author || book.author.toLowerCase() === author.toLowerCase())
                        && (!status || book.status.toLowerCase() === status.toLowerCase())) {
                        filteredBooks.push(book);
                    }
                });
                console.log(filteredBooks);
                res.status(200).json(filteredBooks);
            }
            else {
                console.log(books);
                res.status(200).json(books);
            }
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}
