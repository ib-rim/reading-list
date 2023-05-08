import { useEffect, useState } from "react"

export default function Home() {

    const [books, setBooks] = useState([]);

    const [inputTitle, setInputTitle] = useState('');
    const [inputAuthor, setInputAuthor] = useState('');
    const [inputStatus, setInputStatus] = useState('');
    const [inputStarted, setInputStarted] = useState('');
    const [inputFinished, setInputFinished] = useState('');

    useEffect(() => {
        getBooks();
    }, [])

    const getBooks = async () => {
        fetch('/api/books')
            .then((res) => res.json())
            .then((data) => {
                setBooks(data);
            })
    }
    
    const addBook = async (title, author, status, started, finished) => {
        const book = {
            "title": title,
            "author": author,
        };

        if(status) {
            book["status"] = status;
        }
        if(started) {
            book["started"] = started;
        }
        if(finished) {
            book["finished"] = finished;
        }

        if (confirm(`Add ${title} by ${author}?`)) {
            fetch(`/api/book/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book),
            })
                .then(getBooks())
        }
    }

    const deleteBook = async (id, title, author) => {
        if (confirm(`Delete ${title} by ${author}?`)) {
            fetch(`/api/books/${id}`, {
                method: "DELETE",
            })
                .then(getBooks())
        }
    }

    const formatDateTime = (dateTime) => {
        if (dateTime) {
            return dateTime.toString().split("T")[0];
        }
    }

    return (
        <main>
            <table className="text-black lg:mx-20 my-5 text-left border-cyan-700 border-l-8">
                <caption className="text-5xl text-white text-left font-thin my-10">Reading List</caption>
                <thead className="text-left">
                    <tr>
                        <th className="bg-gray-100 px-2 py-1">Title</th>
                        <th className="bg-gray-100 px-2 py-1">Author</th>
                        <th className="bg-gray-100 px-2 py-1">Status</th>
                        <th className="bg-gray-100 px-2 py-1">Started</th>
                        <th className="bg-gray-100 px-2 py-1">Finished</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="[&>*:nth-child(odd)]:bg-gray-200 [&>*:nth-child(even)]:bg-gray-100">
                    {
                        books.map(book => {
                            return (
                                <tr key={book._id}>
                                    <td className="px-2 py-1">{book.title}</td>
                                    <td className="px-2 py-1">{book.author}</td>
                                    <td className={`px-2 py-1 font-semibold ${book.status === "Read" ? "text-green-600" : book.status === "Reading" ? "text-yellow-500" : "text-red-600"}`}>{book.status}</td>
                                    <td className="px-2 py-1">{formatDateTime(book.started)}</td>
                                    <td className="px-2 py-1">{formatDateTime(book.finished)}</td>
                                    <td className="text-red-700 font-bold px-2 bg-gray-900"><button onClick={() => deleteBook(book._id, book.title, book.author)}>X</button></td>
                                </tr>
                            )
                        })
                    }
                    <tr>
                        <td className="px-2 py-1"><input onInput={e => setInputTitle(e.target.value)} type="text" placeholder="Book Title" className="border border-gray-700 px-1 w-full"></input></td>
                        <td className="px-2 py-1"><input onInput={e => setInputAuthor(e.target.value)} type="text" placeholder="Book Author" className="border border-gray-700 px-1 w-full"></input></td>
                        <td className="px-2 py-1"><input onInput={e => setInputStatus(e.target.value)} type="text" placeholder="Book Status" className="border border-gray-700 px-1 w-full"></input></td>
                        <td className="px-2 py-1"><input onInput={e => setInputStarted(e.target.value)} type="text" placeholder="Started Date" className="border border-gray-700 px-1 w-full"></input></td>
                        <td className="px-2 py-1"><input onInput={e => setInputFinished(e.target.value)} type="text" placeholder="Finished Date" className="border border-gray-700 px-1 w-full"></input></td>
                        <td className="bg-gray-900"><button onClick={() => addBook(inputTitle, inputAuthor, inputStatus, inputStarted, inputFinished)} className="text-green-500 font-bold px-2">Add book</button></td>
                    </tr>
                </tbody>
            </table>
        </main>
    )
}