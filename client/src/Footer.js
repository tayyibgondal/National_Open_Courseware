import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="heading-footer">
        <h2>Join us in shaping the future of learning.</h2>
      </div>
      <div className="buttons-footer">
        <Link to="/faqs" className="blue-button">
          FAQs 
        </Link>
        <Link to="/contact" className="blue-button-reverse">
          Contact
        </Link>
      </div>
      <div className="detail-footer">
        <p>
          UniQuake is an online publication of materials from over 2,500
          courses, freely sharing knowledge with learners and educators around
          Pakistan.
        </p>
      </div>
      <p className="cr">&copy; 2023 UniQuake. All rights reserved.</p>
    </footer>
  );
}
