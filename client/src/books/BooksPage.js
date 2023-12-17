import { useEffect, useState } from "react";
import Post from "./Book";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import Book from "./Book";

export default function BooksPage() {
  const [query, setQuery] = useState("");
  const { data: books, setData: setBooks } = useFetch(
    "http://127.0.0.1 :4000/library"
  );

  async function searchBooks(e) {
    e.preventDefault();
    try {
      const apiUrl = `http://localhost:4000/library/search/${query}`;
      const response = await fetch(apiUrl);
      if (response.ok) {
        const newData = await response.json(); // new worker does the work, main thread can move on. (but doesn't when we use await)
        setBooks(newData);
      } else {
        alert("No results found!");
      }
    } catch (e) {
      alert("Could not resolve query!");
    }
  }
  return (
    <div className="list-page-book">
      <div class="edit-row">
        <h1>Library</h1>
        <div>
          <Link to={`/library/create`} className="create">
            Add new book
          </Link>
        </div>
      </div>

      <form className="search" onSubmit={searchBooks}>
        <input
          className="search"
          type="text"
          placeholder="Search books"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div>
          <input type="submit" value="Search" />
        </div>
      </form>

      {books && books.map((book) => <Book {...book} />)}
    </div>
  );
}
