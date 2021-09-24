import { useEffect, useState } from "react";
import { BookType, getBook } from "../../services/book";
import { Error } from "../ErrorPage/Error";

type BookIdType = {
  id: String
}

export function Book({ id }: BookIdType) {
  const bookId = id.split('/')
  const [book, setBook] = useState<BookType>({
    id: 0,
    name: "",
    price: 0,
    status: "",
    customer: {
      id: 0,
      email: "",
      name: ""
    }
  })
  const [error, setError] = useState(true)

  useEffect(() => {
    async function fetchBook() {
      const getBookId: BookType = await getBook(parseInt(bookId[2]))
      if (getBookId.id !== undefined) {
        setError(false)
        setBook(getBookId)
      }
    }

    fetchBook()
  }, [])

  return (
    <>
      {
        error ? (
          <Error />
        ) : (
          <main className="container">
            <section className="container--image">
              <img src="" alt={`Livro ${book.name}`} />
            </section>
            <section className="container--informations">
              <div className="container--informations--header">
                <h1>{book.name}</h1>
                <div>
                  Edição Português
                  <i></i>
                  por {book.customer.name}
                </div>
              </div>

              <div className="container--informations--header">
                RESUMO
              </div>
            </section>
          </main>
        )
      }
    </>
  )
}