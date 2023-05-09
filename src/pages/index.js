import { useEffect, useState } from "react"
import Link from 'next/link';

export default function Home() {

    const [books, setBooks] = useState([]);

    const [editableBook, setEditableBook] = useState('');

    const [inputTitle, setInputTitle] = useState('');
    const [inputAuthor, setInputAuthor] = useState('');
    const [inputStatus, setInputStatus] = useState('');
    const [inputStarted, setInputStarted] = useState('');
    const [inputFinished, setInputFinished] = useState('');

    const [errorMessages, setErrorMessages] = useState([]);
    const titleError = "New book must have a title";
    const authorError = "New book must have an author";
    const statusError = "New book status must be unread, reading or read";
    const startedError = "New book started date must be in format yyyy-mm-dd";
    const finishedError = "New book finished date must be in format yyyy-mm-dd";

    useEffect(() => {
        getBooks();
    }, [])

    const getBooks = async () => {
        const response = await fetch('/api/books');
        const promise = response.json();
        promise.then((data) => {
            setBooks(data);
        })
    }

    const addBook = async (title, author, status, started, finished) => {
        const book = {
            "title": title,
            "author": author,
        };

        if (status) {
            book["status"] = formatStatus(status);
        }
        if (started) {
            book["started"] = started;
        }
        if (finished) {
            book["finished"] = finished;
        }

        if (confirm(`Add ${title} by ${author}?`)) {
            const response = await fetch(`/api/book`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book),
            })
            const promise = response.json();
            if (response.ok) {
                promise.then(getBooks());
                setErrorMessages([]);
            }
            else {
                promise.then(data => {
                    let messages = [];
                    if (data.message.includes("title")) {
                        messages.push(titleError);
                    }
                    if (data.message.includes("author")) {
                        messages.push(authorError);
                    }
                    if (data.message.includes("status")) {
                        messages.push(statusError);
                    }
                    if (data.message.includes("started")) {
                        messages.push(startedError);
                    }
                    if (data.message.includes("finished")) {
                        messages.push(finishedError);
                    }
                    setErrorMessages(messages);
                });
            }
        }
    }

    const updateBook = async (id, title, author, status, started, finished) => {
        const book = {
        };

        if (title) {
            book["title"] = title;
        }
        if (author) {
            book["author"] = author;
        }
        if (status) {
            book["status"] = formatStatus(status);
        }
        if (started) {
            book["started"] = started;
        }
        if (finished) {
            book["finished"] = finished;
        }

        if (confirm(`Update ${title} by ${author}?`)) {
            const response = await fetch(`/api/books/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(book),
            })
            const promise = response.json();
            promise.then(() => {
                getBooks();
                setEditableBook('');
            })
        }
    }

    const handleEdit = (id, title, author, status, started, finished) => {
        setErrorMessages([]);
        setEditableBook(id);
        if (!id) {
            resetInput();
        }
        else {
            setInputTitle(title);
            setInputAuthor(author);
            setInputStatus(status);
            setInputStarted(started);
            setInputFinished(finished);
        }
    }

    const deleteBook = async (id, title, author) => {
        if (confirm(`Delete ${title} by ${author}?`)) {
            const response = await fetch(`/api/books/${id}`, {
                method: "DELETE",
            });
            const promise = response.json();
            promise.then(getBooks());
        }
    }

    const formatStatus = (status) => {
        if (status) {
            return status.charAt(0).toUpperCase() + status.substr(1).toLowerCase();
        }
    }

    const formatDateTime = (dateTime) => {
        if (dateTime) {
            return dateTime.toString().split("T")[0];
        }
    }

    const resetInput = () => {
        setInputTitle('');
        setInputAuthor('');
        setInputStatus('');
        setInputStarted('');
        setInputFinished('');
    }

    return (
        <main className="lg:mx-20">
            <table className="text-black my-5 text-left border-cyan-700 border-l-8">
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
                                    <td className="px-2 py-1">
                                        {editableBook === book._id ?
                                            <input onInput={e => setInputTitle(e.target.value)} type="text" defaultValue={book.title} className="border border-gray-700 px-1 w-full"></input>
                                            :
                                            book.title
                                        }
                                    </td>
                                    <td className="px-2 py-1">
                                        {editableBook === book._id ?
                                            <input onInput={e => setInputAuthor(e.target.value)} type="text" defaultValue={book.author} className="border border-gray-700 px-1 w-full"></input>
                                            :
                                            book.author
                                        }
                                    </td>
                                    <td className={`px-2 py-1 font-semibold ${book.status === "Read" ? "text-green-600" : book.status === "Reading" ? "text-yellow-500" : "text-red-600"}`}>
                                        {editableBook === book._id ?
                                            <input onInput={e => setInputStatus(e.target.value)} type="text" defaultValue={book.status} className="border border-gray-700 px-1 w-full"></input>
                                            :
                                            book.status
                                        }
                                    </td>
                                    <td className="px-2 py-1">
                                        {editableBook === book._id ?
                                            <input onInput={e => setInputStarted(e.target.value)} type="text" defaultValue={formatDateTime(book.started)} className="border border-gray-700 px-1 w-full"></input>
                                            :
                                            formatDateTime(book.started)
                                        }
                                    </td>
                                    <td className="px-2 py-1">
                                        {editableBook === book._id ?
                                            <input onInput={e => setInputFinished(e.target.value)} type="text" defaultValue={formatDateTime(book.finished)} className="border border-gray-700 px-1 w-full"></input>
                                            :
                                            formatDateTime(book.finished)
                                        }
                                    </td>
                                    <td className="font-bold px-2 bg-gray-900">
                                        {editableBook === book._id ?
                                            <>
                                                <button className="text-green-700 pr-2" onClick={() => updateBook(book._id, inputTitle, inputAuthor, inputStatus, inputStarted, inputFinished)}>✓</button>
                                                <button className="text-red-700" onClick={() => handleEdit('', '', '', '', '', '')}>X</button>
                                            </>
                                            :
                                            <>
                                                <button className="text-blue-700 pr-2" onClick={() => handleEdit(book._id, book.title, book.author, book.status, book.started, book.finished)}>EDIT</button>
                                                <button className="text-red-700" onClick={() => deleteBook(book._id, book.title, book.author)}>DELETE</button>
                                            </>
                                        }
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {!editableBook ?
                        <tr>
                            <td className="px-2 py-1">
                                <input onInput={e => setInputTitle(e.target.value)} type="text" placeholder="Book Title*" className={`px-1 w-full border ${errorMessages.includes(titleError) ? "outline outline-2 outline-red-700" : "border-gray-700"}`}></input>
                            </td>
                            <td className="px-2 py-1">
                                <input onInput={e => setInputAuthor(e.target.value)} type="text" placeholder="Book Author*" className={`px-1 w-full border ${errorMessages.includes(authorError) ? "outline outline-2 outline-red-700" : "border-gray-700"}`}></input>
                            </td>
                            <td className="px-2 py-1">
                                <input onInput={e => setInputStatus(e.target.value)} type="text" placeholder="Book Status" className={`px-1 w-full border ${errorMessages.includes(statusError) ? "outline outline-2 outline-red-700" : "border-gray-700"}`}></input>
                            </td>
                            <td className="px-2 py-1">
                                <input onInput={e => setInputStarted(e.target.value)} type="text" placeholder="Started Date" className={`px-1 w-full border ${errorMessages.includes(startedError) ? "outline outline-2 outline-red-700" : "border-gray-700"}`}></input>
                            </td>
                            <td className="px-2 py-1">
                                <input onInput={e => setInputFinished(e.target.value)} type="text" placeholder="Finished Date" className={`px-1 w-full border ${errorMessages.includes(finishedError) ? "outline outline-2 outline-red-700" : "border-gray-700"}`}></input>
                            </td>
                            <td className="bg-gray-900">
                                <button onClick={() => addBook(inputTitle, inputAuthor, inputStatus, inputStarted, inputFinished)} className="text-yellow-500 font-bold px-2">ADD</button>
                            </td>
                        </tr>
                        :
                        <></>
                    }
                </tbody>
            </table>
            <Link href="/endpoints" className="text-purple-400 underline block w-fit my-3">API Endpoints</Link>
            {
                errorMessages.map(message => {
                    return (
                        <div className="text-red-600 font-bold">{message}</div>
                    )
                })
            }
        </main>
    )
}