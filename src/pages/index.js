import { useEffect, useState } from "react";
import Book from "@/Book";
import Link from "next/link";

export default function Home() {

    const [books, setBooks] = useState([]);

    const [loadingMessage, setLoadingMessage] = useState('Loading reading list ...');

    useEffect(() => {
        getBooks();
    }, [])

    const getBooks = async () => {
        const response = await fetch('/api/books');
        const promise = response.json();
        if (response.ok) {
            promise.then((data) => {
                setBooks(data);
                setLoadingMessage('');
            })
        }
    }

    return (
        <main>
            <Link href="/table" className="text-purple-400 underline block w-fit mx-auto my-3">Reading List Table</Link>
            <Link href="/endpoints" className="text-purple-400 underline block w-fit mx-auto my-3">API Endpoints</Link>
            {
                loadingMessage ?
                    loadingMessage
                    :
                    <div className="bookshelf bg-cyan-950 border-cyan-900 border-8 mx-auto">
                        {
                            books.map((book) => {
                                return <Book key={book._id} color={book.status === "Read" ? "book--green" : book.status === "Reading" ? "book--yellow" : "book--red"} title={book.title} author={book.author}></Book>
                            })
                        }
                    </div>
            }
        </main>
    )
}