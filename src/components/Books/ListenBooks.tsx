import { Link } from "react-router-dom";
import { BookType } from "../../services/book";

import ImageDefault from '../../assets/images/182x274.jpg'
import './style.css'


type BooksType = {
  books: BookType[]
}

export function ListenBooks({ books }: BooksType) {
  return (
    <div className="book--container content--container">
      {
        books.map(book => {
          const numberFormat = book.price.toString().split('.')
          return (
            <Link to={`/book/${book.id}`}>
              <div className="book" key={book.id}>
                <div className="image--container">
                  <img src={ImageDefault} alt="Default" />
                </div>

                <div className="information--container">
                  <h2 className="book--name">{book.name.charAt(0).toUpperCase() + book.name.slice(1)}</h2>
                  <h1 className="book--author">{book.customer.name}</h1>

                  <div className="book--price--container">
                    <div>
                      <span className="book--price--symbol">R$</span>
                      <span className="book--price--integer-value">{numberFormat[0]}</span>
                      <span className="book--price--decimal-value">{numberFormat[1] ? numberFormat[1].padEnd(2, '0') : "00"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}