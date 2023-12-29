import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import useFetch from "../useFetch";
import { UserContext } from "../authentication/UserContext";
import { useState } from "react";
import Footer from "../Footer";


export default function BookDetails() {
  const { userInfo } = useContext(UserContext);
  const navigator = useNavigate();
  const { bookId } = useParams();
  const { data } = useFetch(`http://localhost:4000/library/${bookId}`);

  async function handleDelete() {
    try {
      const apiUrl = `http://localhost:4000/library/delete/${bookId}`;
      const req = {
        method: "DELETE",
      };
      const response = await fetch(apiUrl, req);
      if (response.ok) {
        navigator("/library");
      } else {
        alert("The book could not be deleted!");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  }

  return (
    <div className="book-page">
      {data && (
        <div>
          <h1>{data.title}</h1>
          <button onClick={() => navigator(-1)}>Go Back</button>
          <p>
            Author:&nbsp;
            {data.author}
          </p>
          {true && (
            <div>
              <div className="edit-row">
                <Link to={`/library/edit/${data._id}`} className="Edit">
                  Edit
                </Link>
                <button onClick={handleDelete} className="Delete">
                  Delete
                </button>
              </div>

              <div className="summary">{data.summary}</div>
              <div className="author">
                By:&nbsp;
                {data.uploader.username}
              </div>
              <time>
                Created at:&nbsp;
                {formatISO9075(data.createdAt)}
              </time>
              <div className="download">
                <a
                  href={`http://localhost:4000/uploads/${
                    data.book.split("\\")[1]
                  }`}
                  download
                  target="_blank"
                >
                  Click to download!
                </a>
              </div>
              <Footer></Footer>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
