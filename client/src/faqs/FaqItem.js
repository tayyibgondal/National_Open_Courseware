import React from "react";
import { Link } from "react-router-dom";

export default function FaqItem({ _id, question, answer, createdAt }) {
  const isAdmin = localStorage.getItem("isAdmin");
  console.log(isAdmin && answer == null);
  return (
    <div className="faq-card">
      <h2 className="faq-question">{question}</h2>
      <p className="faq-answer">{answer}</p>
      <p className="faq-info">
        <span className="info-label">Created on:</span>{" "}
        {new Date(createdAt).toLocaleDateString()}
      </p>
      {isAdmin && answer == null && (
        <div>
          <p>
            Status:&nbsp;<b>Unanswered</b>
          </p>
          <Link to={`/faqs/edit/${_id}`} className="details-link">
           Answer the faq
          </Link>
        </div>
      )}

      <Link to={`/faqs/${_id}`} className="details-link">
        View Details
      </Link>
    </div>
  );
}
