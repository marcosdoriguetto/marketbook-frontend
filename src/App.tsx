import { useEffect, useState } from "react";
import { Books } from "./components/Books";
import { Header } from "./components/Header";
import { BookType, getBooks } from "./services/book";

function App() {
  const [loading, setLoading] = useState(true)
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
