import { useEffect, useState } from"react"

export default function Home() {

    const [books, setBooks] = useState([]);

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

    return (
        <main>
            <h1 className="text-5xl font-thin w-fit mx-20  mt-20">Reading List</h1>
            <table className="text-black mx-20 my-5 text-left border-cyan-700 border-l-8">
                <thead className="text-left">
                    <tr>
                        <th className="bg-gray-100 border-b-2 px-2 py-1">Title</th>
                        <th className="bg-gray-100 border-b-2 px-2 py-1">Author</th>
                        <th className="bg-gray-100 border-b-2 px-2 py-1">Status</th>
                        <th className="bg-gray-100 border-b-2 px-2 py-1">Started</th>
                        <th className="bg-gray-100 border-b-2 px-2 py-1">Finished</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map(book => {
                            return (
                                <tr key={book._id}>
                                    <td className="bg-gray-100 px-2 py-1">{book.title}</td>
                                    <td className="bg-gray-100 px-2 py-1">{book.author}</td>
                                    <td className={`bg-gray-100 px-2 py-1 font-semibold ${book.status === "Read" ? "text-green-600" : book.status === "Reading" ? "text-yellow-500" : "text-red-600" }`}>{book.status}</td>
                                    <td className="bg-gray-100 px-2 py-1">{book.started}</td>
                                    <td className="bg-gray-100 px-2 py-1">{book.finished}</td>
                                    <td className="text-red-700 font-bold px-2"><button>X</button></td>
                                </tr>
                            )
                        })
                    }
                    <tr>
                        <td className="bg-gray-100 px-2 py-1"><input type="text" placeholder="Book Title" className="border border-gray-700 px-1"></input></td>
                        <td className="bg-gray-100 px-2 py-1"><input type="text" placeholder="Book Author" className="border border-gray-700 px-1"></input></td>
                        <td className="bg-gray-100 px-2 py-1"><input type="text" placeholder="Book Status" className="border border-gray-700 px-1"></input></td>
                        <td className="bg-gray-100 px-2 py-1"><input type="text" placeholder="Started Date" className="border border-gray-700 px-1"></input></td>
                        <td className="bg-gray-100 px-2 py-1"><input type="text" placeholder="Finished Date" className="border border-gray-700 px-1"></input></td>
                        <td className=""><button className="text-green-500 font-bold px-2">Add book</button></td>
                    </tr>
                </tbody>
            </table>
        </main>
    )
}