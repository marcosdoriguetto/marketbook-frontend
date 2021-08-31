import { useEffect, useState } from "react";
import { Books } from "./components/Books";
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
      <Books books={books} />
    </div>
  );
}

export default App;
