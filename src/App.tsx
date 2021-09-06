import { useEffect, useState } from "react";
import { Books } from "./components/Books/Books";
import { Header } from "./components/Header/Header";
import { BookType, getBooks } from "./services/book";

function App() {
  const [books, setBooks] = useState<BookType[]>([])

  useEffect(() => {
    async function fetchData() {
      const getAllBooks: BookType[] = await getBooks()

      setBooks(getAllBooks)
    }

    fetchData()
  }, [])

  return (
    <div className="App">
      <Header />
      <Books books={books} />
    </div>
  );
}

export default App;
