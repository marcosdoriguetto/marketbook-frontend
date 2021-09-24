import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Books } from "./pages/BooksPage/Books";
import { BooksSearch } from './pages/BooksSearchPage/BooksSearch';
import { Header } from "./components/Header/Header";
import { Book } from "./pages/BookPage/Book";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Books} />
        <Route path="/book/:id" component={Book} />
        <Route path="/books/:slug" component={BooksSearch} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
