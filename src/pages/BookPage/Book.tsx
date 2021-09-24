import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Loading } from "../../components/Loading/Loading";
import { BookType, getBook } from "../../services/book";
import { Error } from "../ErrorPage/Error";

export function Book() {
  const { id } = useParams<{ id?: string }>()
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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(true)

  useEffect(() => {
    async function fetchBook() {
      const getBookId: BookType = await getBook(parseInt(id!!))
      if (getBookId.id !== undefined) {
        setError(false)
        setBook(getBookId)
      }
      setLoading(false)
    }

    fetchBook()
  }, [id])

  return (
    <>
      {loading ? <Loading /> : (
        <>
          {!error ? (
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
          ) : <Error />}
        </>
      )
      }
    </>
  )
}