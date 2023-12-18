import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import useFetch from "../useFetch";
import { UserContext } from "../authentication/UserContext";

export default function PostDetails() {
  const { userInfo } = useContext(UserContext);
  const { postId } = useParams();
  const { data, setData } = useFetch(
    `http://localhost:4000/posts/${postId}`
  );
  const navigator = useNavigate();

  async function handleDelete(e) {
    e.preventDefault();
    const apiUrl = `http://localhost:4000/posts/delete/${postId}`;
    const req = {
      method: "DELETE",
    };
    const response = await fetch(apiUrl, req);
    if (response.ok) {
      navigator("/posts");
    } else {
      alert("The post could not be deleted!");
    }
  }

  return (
    <div className="post-page">
      {data && (
        <div>
          <div className="image">
            <img
              style={{ width: "100%" }}
              src={`http://localhost:4000/uploads/${data.cover.split("\\")[1]}`}
            />
          </div>
          {userInfo.id === data.author._id && (
            <div class="edit-row">
              <Link to={`/edit/${data._id}`} className="Edit">
                Edit
              </Link>
              <a href="" className="Edit" onClick={handleDelete}>
                Delete
              </a>
            </div>
          )}
          <h1>{data.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
          <div className="author">By: {data.author.username}</div>
          <time>{formatISO9075(data.createdAt)}</time>
        </div>
      )}
    </div>
  );
}
