import { ChangeEvent, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Books } from "./components/Books/Books";
import { Header } from "./components/Header/Header";
import { Book } from "./pages/BookPage/Book";
import { BookType, getBooks } from "./services/book";

function App() {
  const [books, setBooks] = useState<BookType[]>([])
  const [booksSearch, setBooksSearch] = useState<BookType[]>([])
  const [search, setSearch] = useState('')
  const [sortSearch, setSortSearch] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const getAllBooks: BookType[] = await getBooks()

      setBooks(getAllBooks)
    }

    fetchData()
  }, [])

  function handlerEvent(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function handlerSortSearch() {
    if (search.length > 0) {
      let bookFilter: BookType[] = []
      books.length > 0 && (
        books.filter(book => {
          if (book.name.toLowerCase().includes(search.toLowerCase())) {
            return bookFilter.push(book)
          }
          return false
        })
      )
      setSortSearch(true)
      setBooksSearch(bookFilter)
    } else {
      setSortSearch(false)
    }
  }

  return (
    <BrowserRouter>
      <Header handlerChange={handlerEvent} handlerSetSort={handlerSortSearch} />
      <Switch>
        <Route path="/" exact render={() => <Books books={sortSearch ? booksSearch : books} />} />
        <Route path="/book/:id" render={props => <Book id={props.location.pathname} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
