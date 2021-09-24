import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import { ListenBooks } from "../../components/Books/ListenBooks"
import { Loading } from "../../components/Loading/Loading"
import { BookType, getBooksByName } from "../../services/book"
import { Error } from "../ErrorPage/Error"

export function BooksSearch() {
  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }

  const query = useQuery().get("name")
  const [books, setBooks] = useState<BookType[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true)
      if (query) {
        const dataBooks = await getBooksByName(query)
        setBooks(dataBooks)
      }

      setLoading(false)
    }

    fetchBooks()
  }, [query])

  return (
    <>
      {
        loading ? <Loading /> : (
          <>
            {
              books.length > 0 ? (
                <ListenBooks books={books} />
              ) : <Error />
            }
          </>
        )
      }
    </>
  )
}