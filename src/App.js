import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Shelfs from "./components/Shelfs";
import * as API from "./BooksAPI";
import Book from "./components/Book";

function App() {
  const [books, setBooks] = useState([]);
  const [searchBooks, setSearchBooks] = useState([]);
  const [idOfBook, setIdOfBook] = useState(new Map());
  const [allBooks, setAllBooks] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    API.getAll().then((data) => {
      setBooks(data);
      setIdOfBook(createIdOfBooks(data));
    });
  }, []);

  useEffect(() => {
    let isActive = true;
    if (search) {
      API.search(search).then((data) => {
        if (data.error) {
          console.log(data);
        } else {
          if (isActive) {
            setSearchBooks(data);
          }
        }
      });
      return () => {
        isActive = false;
        setSearchBooks([]);
      };
    }
  }, [search]);
  const createIdOfBooks = (books) => {
    const map = new Map();
    books.map((book) => map.set(book.id, book));
    return map;
  };
  useEffect(() => {
    const all = searchBooks.map((book) => {
      if (idOfBook.has(book.id)) {
        return idOfBook.get(book.id);
      } else {
        return book;
      }
    });
    setAllBooks(all);
  }, [searchBooks]);
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
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            exact
            path="/search"
            element={
              <div className="search-books">
                <div className="search-books-bar">
                  <Link to={"/"}>
                    <a className="close-search">Close</a>
                  </Link>
                  <div className="search-books-input-wrapper">
                    <input
                      type="text"
                      placeholder="Search by title, author, or ISBN"
                      value={search}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
                <div className="search-books-results">
                  <ol className="books-grid">
                    {allBooks.map((book) => (
                      <li key={book.id}>
                        <Book book={book} update={update} />
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            }
          ></Route>

          <Route
            path="/"
            element={
              <div className="list-books">
                <Header />
                <div className="list-books-content">
                  <Shelfs books={books} update={update} />
                </div>
                <div className="open-search">
                  <Link to={"/search"}>
                    <a>Add a book</a>
                  </Link>
                </div>
              </div>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
