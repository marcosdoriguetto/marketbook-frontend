import { BookType } from "../../services/book";
import './style.css'

type BooksType = {
  books: BookType[]
}

export function Books({ books }: BooksType) {
  return (
    <div className="book--container">
      {
        books.map(book => {
          return (
            <div key={book.id}>
              <h1>{book.name}</h1>
              <h2>{book.price.toFixed(2)}</h2>
              <h3>{book.status}</h3>
              <div>
                <h1>{book.customer.name}</h1>
                <h2>{book.customer.email}</h2>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}