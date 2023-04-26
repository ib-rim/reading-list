# Reading List API

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Return values are given in JSON.

## API Routes

### **`POST`** new book to the reading list

> https://reading-list-eight.vercel.app/api/book

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

#

### **`GET`** all books from the reading list 

> https://reading-list-eight.vercel.app/api/books

#

### **`GET`** all books from the reading list filtered using **optional** single or combined query parameters for title, author and status

> https://reading-list-eight.vercel.app/api/books?title=[title]&author=[author]&status=[status]

#

### **`GET`** book with given id

> https://reading-list-eight.vercel.app/api/books/[id]

#

### **`PUT`** book with given id with new field values 

> https://reading-list-eight.vercel.app/api/books/[id]

#

### **`DELETE`** book with given id from the reading list 

> https://reading-list-eight.vercel.app/api/books/[id] 
