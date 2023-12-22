import React from "react";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../useFetch";
import { UserContext } from "../authentication/UserContext";
import "./details.css";
import Footer from "../Footer";

export default function FaqDetails() {
  const { userInfo } = useContext(UserContext);
  const navigator = useNavigate();
  const { faqId } = useParams();
  const { data, canAccess } = useFetch(`http://localhost:4000/faqs/${faqId}`);

  async function handleDelete() {
    try {
      const apiUrl = `http://localhost:4000/faqs/delete/${faqId}`;
      const req = {
        method: "DELETE",
        credentials: "include",
      };
      const response = await fetch(apiUrl, req);
      if (response.ok) {
        navigator("/faqs");
      } else {
        alert("The FAQ could not be deleted!");
      }
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  }

  return (
    <div>
      {canAccess && data && (
        <div className="faq-details">
          <div>
            <h1>{data.question}</h1>
            <button onClick={() => navigator(-1)}>Go Back</button>
            <p>
              Answer:&nbsp;
              {data.answer}
            </p>
            <div className="faq-info">
              <div className="edit-row">
                <Link to={`/faqs/edit/${faqId}`} className="Edit">
                  Edit
                </Link>
                <button onClick={handleDelete} className="Delete">
                  Delete
                </button>
              </div>
            </div>
          </div>
          <Footer></Footer>
        </div>
      )}
    </div>
  );
}
