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

  const queryName = useQuery().get("name")
  const queryPage = useQuery().get("page")

  const [books, setBooks] = useState<BookType[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true)
      if (queryName && queryPage) {
        const dataBooks = await getBooksByName(queryName, parseInt(queryPage))
        setBooks(dataBooks)
      }

      setLoading(false)
    }

    fetchBooks()
  }, [queryName])

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