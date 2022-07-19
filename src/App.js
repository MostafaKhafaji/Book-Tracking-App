import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Shelfs from "./components/Shelfs";
import * as API from "./BooksAPI";
function App() {
  useEffect(() => {
    API.getAll().then((data) => {
      setBooks(data);
    });
  });
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);
  const update = (book, targetShelf) => {
    const newBooks = books.map((currentBook) => {
      if (currentBook.id === book.id) {
        book.shelf = targetShelf;
        return book;
      }
      return currentBook;
    });
    setBooks(newBooks);
    API.update(book, targetShelf);
  };
  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <Header />
          <div className="list-books-content">
            <Shelfs books={books} update={update} />
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
