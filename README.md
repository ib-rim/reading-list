# Reading List API

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Return values are given in JSON.

## API Routes

### **`POST`** https://reading-list-eight.vercel.app/api/book

Add a new book to the reading list

<table>
    <tr>
       <th>Field</th>
       <th>Type</th>
       <th>Required?</th>
       <th>Extra info</th>
    </tr>
    <tr>
        <td>title</td>
        <td>String</td>
        <td>Yes</td>
        <td>n/a</td>
    </tr>
    <tr>
        <td>author</td>
        <td>String</td>
        <td>Yes</td>
        <td>n/a</td>
    </tr>
    <tr>
        <td>status</td>
        <td>String</td>
        <td>No</td>
        <td>Valid values are "Unread", "Reading" or "Read". Defaults to "Unread".</td>
    </tr>
    <tr>
        <td>started</td>
        <td>Date</td>
        <td>No</td>
        <td>ISODate format</td>
    </tr>
    <tr>
        <td>finished</td>
        <td>Date</td>
        <td>No</td>
        <td>ISODate format</td>
    </tr>
</table>

---

### **`GET`** https://reading-list-eight.vercel.app/api/books?title=[title]&author=[author]&status=[status]

Get all books from the reading list

Results can be filtered using **optional** single or combined query parameters for `title`, `author` and `status`.

### **`GET`** https://reading-list-eight.vercel.app/api/books/[id]

Get book with given `id` 

### **`PUT`** https://reading-list-eight.vercel.app/api/books/[id]

Update book with given `id` with new field values 

### **`DELETE`** https://reading-list-eight.vercel.app/api/books/[id]

Delete book with given `id` from the reading list 
