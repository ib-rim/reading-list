
export default function Endpoints() {
    return (
        <main className="p-3">
            <h1 className="text-3xl font-bold">Reading List API</h1>
            <p className="py-3">Return values are given in JSON.</p>

            <div className="divide-y divide-gray-600">
                <div className="py-3">
                    <h3 className="text-xl pb-3">
                        <span className="text-yellow-500 font-semibold mx-5">POST</span>
                        <span>new book to the reading list</span>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-800 p-2 mx-2 mb-3">
                        <a href="https://reading-list-eight.vercel.app/api/book">https://reading-list-eight.vercel.app/api/book</a>
                    </p>
                    <table className="mx-2 table-auto border-collapse border border-gray-700">
                        <thead>
                            <tr className="bg-gray-950">
                                <th className="border border-gray-700 py-1 px-2 text-left text-white">Field</th>
                                <th className="border border-gray-700 py-1 px-2 text-left text-white">Type</th>
                                <th className="border border-gray-700 py-1 px-2 text-left text-white">Required?</th>
                                <th className="border border-gray-700 py-1 px-2 text-left text-white">Extra info</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="b">
                                <td className="border border-gray-700 py-1 px-2 text-left">title</td>
                                <td className="border border-gray-700 py-1 px-2 text-left">String</td>
                                <td className="border border-gray-700 py-1 px-2 text-left">Yes</td>
                                <td className="border border-gray-700 py-1 px-2 text-left">n/a</td>
                            </tr>
                            <tr className="">
                                <td className="border border-gray-700 py-1 px-2 text-left">author</td>
                                <td className="border border-gray-700 py-1 px-2 text-left">String</td>
                                <td className="border border-gray-700 py-1 px-2 text-left">Yes</td>
                                <td className="border border-gray-700 py-1 px-2 text-left">n/a</td>
                            </tr>
                            <tr className="b">
                                <td className="border border-gray-700 py-1 px-2 text-left">status</td>
                                <td className="border border-gray-700 py-1 px-2 text-left">String</td>
                                <td className="border border-gray-700 py-1 px-2 text-left">No</td>
                                <td className="border border-gray-700 py-1 px-2 text-left">Valid values are &quot;Unread&quot;, &quot;Reading&quot; or &quot;Read&quot;. Defaults to &quot;Unread&quot;.</td>
                            </tr>
                            <tr className="">
                                <td className="border border-gray-700 py-1 px-2 text-left">started</td>
                                <td className="border border-gray-700 py-1 px-2 text-left">Date</td>
                                <td className="border border-gray-700 py-1 px-2 text-left">No</td>
                                <td className="border border-gray-700 py-1 px-2 text-left">ISODate format</td>
                            </tr>
                            <tr className="b">
                                <td className="border border-gray-700 py-1 px-2 text-left">finished</td>
                                <td className="border border-gray-700 py-1 px-2 text-left">Date</td>
                                <td className="border border-gray-700 py-1 px-2 text-left">No</td>
                                <td className="border border-gray-700 py-1 px-2 text-left">ISODate format</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="py-3">
                    <h3 className="text-xl pb-3">
                        <span className="text-green-500 font-semibold mx-5">GET</span>
                        <span>all books from the reading list</span>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-800 p-2 mx-2 mb-3">
                        <a href="https://reading-list-eight.vercel.app/api/books">https://reading-list-eight.vercel.app/api/books</a>
                    </p>
                </div>

                <div className="py-3">
                    <h3 className="text-xl pb-3">
                        <span className="text-green-500 font-semibold mx-5">GET</span>
                        <span>all books from the reading list filtered using optional single or combined query parameters for title, author and status</span>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-800 p-2 mx-2 mb-3">
                        <a href="https://reading-list-eight.vercel.app/api/books?title=[title]&author=[author]&status=[status]">https://reading-list-eight.vercel.app/api/books?title=[title]&author=[author]&status=[status]</a>
                    </p>
                </div>

                <div className="py-3">
                    <h3 className="text-xl pb-3">
                        <span className="text-green-500 font-semibold mx-5">GET</span>
                        <span>book with given id</span>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-800 p-2 mx-2 mb-3">
                        <a href="https://reading-list-eight.vercel.app/api/books/[id]">https://reading-list-eight.vercel.app/api/books/[id]</a>
                    </p>
                </div>

                <div className="py-3">
                    <h3 className="text-xl pb-3">
                        <span className="text-blue-500 font-semibold mx-5">PUT</span>
                        <span>book with given id with new field values</span>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-800 p-2 mx-2 mb-3">
                        <a href="https://reading-list-eight.vercel.app/api/books/[id]">https://reading-list-eight.vercel.app/api/books/[id]</a>
                    </p>
                </div>

                <div className="py-3">
                    <h3 className="text-xl pb-3">
                        <span className="text-red-500 font-semibold mx-5 2">DELETE</span>
                        <span>book with given id from the reading list</span>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 bg-gray-200 dark:bg-gray-800 p-2 mx-2 mb-3">
                        <a href="https://reading-list-eight.vercel.app/api/books/[id]">https://reading-list-eight.vercel.app/api/books/[id]</a>
                    </p>
                </div>
            </div>
        </main>
    )
}
