import dbConnect from '@/lib/dbConnect';
import Book from '../../../../models/bookModel';

export default async function handler(req, res) {
    await dbConnect();
    const slug = req.query.slug.toLowerCase();
    const slugValue = req.query.slugValue.toLowerCase();

    if (slug === 'title') {
        if (req.method === 'GET') {
            try {
                const books = await Book.find({});
                const filteredBooks = [];
                books.forEach(book => {
                    if (book.title.toLowerCase() === slugValue) {
                        filteredBooks.push(book);
                    }
                });
                console.log(filteredBooks);
                res.status(200).json(filteredBooks);
            } catch (error) {
                console.log(error.message);
                res.status(500).json({ message: error.message })
            }
        }
    }
    else if (slug === 'author') {
        if (req.method === 'GET') {
            try {
                const books = await Book.find({});
                const filteredBooks = [];
                books.forEach(book => {
                    if (book.author.toLowerCase() === slugValue) {
                        filteredBooks.push(book);
                    }
                });
                console.log(filteredBooks);
                res.status(200).json(filteredBooks);
            } catch (error) {
                console.log(error.message);
                res.status(500).json({ message: error.message })
            }
        }
    }
    else if (slug === 'status') {
        if (req.method === 'GET') {
            try {
                const books = await Book.find({});
                const filteredBooks = [];
                books.forEach(book => {
                    if (book.status.toLowerCase() === slugValue) {
                        filteredBooks.push(book);
                    }
                });
                console.log(filteredBooks);
                res.status(200).json(filteredBooks);
            } catch (error) {
                console.log(error.message);
                res.status(500).json({ message: error.message })
            }
        }
    }
    else {
        res.status(404).json({ message: `Slug '${slug}' does not exist` });
    }
}
