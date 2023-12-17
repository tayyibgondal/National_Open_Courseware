import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import useFetch from "../useFetch";
import { UserContext } from "../authentication/UserContext";

export default function BookDetails() {
  const { userInfo } = useContext(UserContext);
  const { bookId } = useParams();
  const { data, setData } = useFetch(`http://localhost:4000/library/${bookId}`);
  const navigator = useNavigate();

  // async function handleDelete(e) {
  //   e.preventDefault();
  //   const apiUrl = `http://localhost:4000/delete/${postId}`;
  //   const req = {
  //     method: "DELETE",
  //   };
  //   const response = await fetch(apiUrl, req);
  //   if (response.ok) {
  //     navigator("/posts");
  //   } else {
  //     alert("The post could not be deleted!");
  //   }
  // }

  return (
    <div className="book-page">
      {data && (
        <div>
          <h1>{data.title}</h1>
          <p>
            Author:&nbsp;
            {data.author}
          </p>
          {true && (
            <div>
              {userInfo.id === data.uploader._id && (
                <div class="edit-row">
                  <Link to={`/library/edit/${data._id}`} className="Edit">
                    Edit
                  </Link>
                </div>
              )}
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
            </div>
          )}
        </div>
      )}
    </div>
  );
}
