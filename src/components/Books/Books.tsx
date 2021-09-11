import { BookType } from "../../services/book";
import './style.css'

type BooksType = {
  books: BookType[]
}

export function Books({ books }: BooksType) {
  return (
    <div className="book--container">
      {
        books.length > 0 ? (
          books.map(book => {
            return (
              <div className="book" key={book.id}>
                <h1>{book.name}</h1>
                <h2>{book.price.toFixed(2)}</h2>
                <h3>{book.status}</h3>
                <div>
                  <h4>{book.customer.name}</h4>
                  <h5>{book.customer.email}</h5>
                </div>
              </div>
            )
          })
        ) : <p>Error!</p>
      }
    </div>
  )
}