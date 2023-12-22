import React, { useState, useEffect } from "react";
import useFetch from "../useFetch";
import FaqItem from "./FaqItem";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

export default function FaqsPage() {
  const navigator = useNavigate();
  const {
    data: faqs,
    setData: setFaqs,
    canAccess,
  } = useFetch("http://127.0.0.1:4000/faqs");

  return (
    <div>
      {canAccess && (
        <div className="list-page-faq">
          <h1>Frequently Asked Questions</h1>
          <button onClick={() => navigator(-1)}>Go Back</button>

          {faqs && faqs.map((faq) => <FaqItem key={faq._id} {...faq} />)}
          {faqs && <Footer />}
        </div>
      )}
    </div>
  );
}
