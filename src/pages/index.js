import { useEffect, useState } from "react"

export default function Home() {

    const [books, setBooks] = useState([]);

    const [editableBook, setEditableBook] = useState('');

    const [inputTitle, setInputTitle] = useState('');
    const [inputAuthor, setInputAuthor] = useState('');
    const [inputStatus, setInputStatus] = useState('');
    const [inputStarted, setInputStarted] = useState('');
    const [inputFinished, setInputFinished] = useState('');

    const [errorMessages, setErrorMessages] = useState([]);

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
            book["status"] = status;
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
                    if (data.message.includes("No title given")) {
                        messages.push("New book must have a title");
                    }
                    if (data.message.includes("No author given")) {
                        messages.push("New book must have an author");
                    }
                    setErrorMessages(messages);
                });
            }
        }
    }

    const updateBook = async (id, title, author, status, started, finished) => {
        const book = {
            "title": title,
            "author": author,
        };

        if (status) {
            book["status"] = status;
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
                                <input onInput={e => setInputTitle(e.target.value)} type="text" placeholder="Book Title*" className={`px-1 w-full border ${errorMessages.includes("New book must have a title") ? "outline outline-2 outline-red-700" : "border-gray-700"}`}></input>
                            </td>
                            <td className="px-2 py-1">
                                <input onInput={e => setInputAuthor(e.target.value)} type="text" placeholder="Book Author*" className={`px-1 w-full border ${errorMessages.includes("New book must have an author") ? "outline outline-2 outline-red-700" : "border-gray-700"}`}></input>
                            </td>
                            <td className="px-2 py-1">
                                <input onInput={e => setInputStatus(e.target.value)} type="text" placeholder="Book Status" className="border border-gray-700 px-1 w-full"></input>
                            </td>
                            <td className="px-2 py-1">
                                <input onInput={e => setInputStarted(e.target.value)} type="text" placeholder="Started Date" className="border border-gray-700 px-1 w-full"></input>
                            </td>
                            <td className="px-2 py-1">
                                <input onInput={e => setInputFinished(e.target.value)} type="text" placeholder="Finished Date" className="border border-gray-700 px-1 w-full"></input>
                            </td>
                            <td className="bg-gray-900">
                                <button onClick={() => addBook(inputTitle, inputAuthor, inputStatus, inputStarted, inputFinished)} className="text-green-500 font-bold px-2">ADD</button>
                            </td>
                        </tr>
                        :
                        <></>
                    }
                </tbody>
            </table>
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