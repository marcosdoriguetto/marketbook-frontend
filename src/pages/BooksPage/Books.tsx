import { useEffect, useState } from "react"
import { ListenBooks } from "../../components/Books/ListenBooks"
import { Loading } from "../../components/Loading/Loading"
import { BookType, getBooks } from "../../services/book"
import { Error } from "../ErrorPage/Error"

export function Books() {
  const [books, setBooks] = useState<BookType[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true)
      const dataBooks = await getBooks()

      setBooks(dataBooks)
      setLoading(false)
    }

    fetchBooks()
  }, [])

  return (
    <>
      {
        loading ? <Loading /> : (
          <>
            {books ?
              (books.length > 0 ? (
                <ListenBooks books={books} />
              ) : <Error errorId={2} />) : <Error errorId={1} />
            }
          </>

        )
      }
    </>
  )
}