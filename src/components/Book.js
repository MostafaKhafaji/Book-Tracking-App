import React from "react";
export default function Book(props) {
  const handleBookShelf = (e) => {
    props.update(props.book, e.target.value);
  };
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${props.book.imageLinks.smallThumbnail})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select defaultValue={props.book.shelf} onChange={handleBookShelf}>
            <option value="none" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{props.book.title}</div>
      <div className="book-authors">{props.book.publisher}</div>
    </div>
  );
}
