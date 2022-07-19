import React from "react";
import Shelf from "./Shelf";
export default function Shelfs(props) {
  const currentlyReading = props.books.filter(
    (book) => book.shelf === "currentlyReading"
  );
  const wantToRead = props.books.filter((book) => book.shelf === "wantToRead");
  const read = props.books.filter((book) => book.shelf === "read");
  return (
    <div>
      <Shelf
        title="Currently Reading"
        books={currentlyReading}
        update={props.update}
      />
      <Shelf title="Want To Read" books={wantToRead} update={props.update} />
      <Shelf title="Read" books={read} update={props.update} />
    </div>
  );
}
