import React, { useState, useEffect } from "react";
import useFetch from "../useFetch";
import FaqItem from "./FaqItem";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function FaqsPage() {
  const isAdmin = localStorage.getItem("isAdmin");
  const navigator = useNavigate();
  const { data: faqs, setData: setFaqs } = useFetch(
    "http://127.0.0.1:4000/faqs"
  );

  const [canAccess, setCanAccess] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("id")) {
      navigator("/");
    }
    setCanAccess(true);
  });

  return (
    <div>
      {canAccess && (
        <div className="list-page-faq">
          <h1>Frequently Asked Questions</h1>
          <button onClick={() => navigator(-1)}>Go Back</button>
          {isAdmin && <Link to="/faqs/create">Create a faq</Link>}
          {!isAdmin && <Link to="/faqs/create">Ask a question</Link>}

          {faqs && faqs.map((faq) => <FaqItem key={faq._id} {...faq} />)}
          {faqs && <Footer />}
        </div>
      )}
    </div>
  );
}
