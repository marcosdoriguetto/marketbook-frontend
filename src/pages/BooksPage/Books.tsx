import { Pagination } from "@material-ui/lab"
import { useEffect, useState } from "react"
import { ListenBooks } from "../../components/Books/ListenBooks"
import { Loading } from "../../components/Loading/Loading"
import { BookType, getBooks } from "../../services/book"
import { Error } from "../ErrorPage/Error"

export function Books() {
  const [books, setBooks] = useState<BookType[]>()
  const [loading, setLoading] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true)
      const dataBooks = await getBooks()
      setTotalPages(dataBooks.totalPages)
      setPageNumber(dataBooks.currentPage)

      setBooks(dataBooks.item)

      setLoading(false)
    }

    fetchBooks()
  }, [])

  const numberPage = async (page: number) => {
    setLoading(true)
    const dataBooks = await getBooks(page - 1)
    setPageNumber(dataBooks.currentPage)

    setBooks(dataBooks.item)
    setLoading(false)
  }

  return (
    <>
      {
        loading ? <Loading /> : (
          <>
            {books ?
              (books.length > 0 ? (
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

              ) : <Error errorId={2} />) : <Error errorId={1} />
            }
          </>

        )
      }
    </>
  )
}