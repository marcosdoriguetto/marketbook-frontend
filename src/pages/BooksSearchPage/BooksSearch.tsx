import { Pagination } from "@material-ui/lab"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import { ListenBooks } from "../../components/Books/ListenBooks"
import { Loading } from "../../components/Loading/Loading"
import { BookType, getBooksByName } from "../../services/book"
import { Error } from "../ErrorPage/Error"

import './style.css'

export function BooksSearch() {
  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }

  const queryName = useQuery().get("name")

  const [books, setBooks] = useState<BookType[]>([])
  const [loading, setLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)
  const [totalPages, setTotalPages] = useState(0)


  useEffect(() => {
    async function fetchBooks() {
      setLoading(true)
      if (queryName) {
        const dataBooks = await getBooksByName(queryName)

        setPageNumber(dataBooks.currentPage)
        setTotalPages(dataBooks.totalPages)
        setBooks(dataBooks.item)
      }

      setLoading(false)
    }

    fetchBooks()
  }, [queryName])

  const numberPage = async (page: number) => {
    setLoading(true)

    const dataBooks = await getBooksByName(queryName!!, page - 1)
    setPageNumber(dataBooks.currentPage)

    setBooks(dataBooks.item)
    setLoading(false)
  }

  return (
    <>
      {
        loading ? <Loading /> : (
          <>
            {
              books ? (books.length > 0 ? (
                <div className="content--container">
                  <ListenBooks books={books} />
                  {
                    totalPages > 1 && <Pagination
                      shape="rounded"
                      color="primary"
                      page={pageNumber + 1}
                      onChange={(event, page) => numberPage(page)}
                      count={totalPages}
                    />
                  }
                </div>

              ) : <Error errorId={2} />
              ) : <Error errorId={1} />
            }
          </>
        )
      }
    </>
  )
}