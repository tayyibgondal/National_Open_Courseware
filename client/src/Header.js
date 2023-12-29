import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./authentication/UserContext";
import "./Header.css";

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigator = useNavigate();
  const [showFilesDropdown, setShowFilesDropdown] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/verify_token", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Internal server error");
      })
      .then((data) => {
        setUserInfo(data);
      })
      .catch((e) => {
        setUserInfo(null);
        console.log("Could not load cookie");
      });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include",
    });
    setUserInfo(null);
    navigator("/");
  }

  return (
    <header>
      <Link to="/posts" className="logo">
        National Open Courseware
      </Link>
      {!userInfo?.username && (
        <nav>
          <Link to="/">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      )}
      {userInfo?.username && (
        <nav>
          <Link to="/tutor" style={{ width: "90px" }}>
            Your Tutor
          </Link>
          <Link to="/courses">Courses</Link>
          <Link to="/library">Library</Link>
          <div
            className="files-dropdown"
            onMouseEnter={() => setShowFilesDropdown(true)}
            onMouseLeave={() => setShowFilesDropdown(false)}
          >
            <span>More</span>
            {showFilesDropdown && (
              <div className="files-dropdown-content vertical">
                <Link to="/posts">Blogs</Link>
                <Link to="/careers">Career Paths</Link>
                <Link to="/donate">Donate</Link>
                <Link to="/contact">Contact us</Link>
                <Link to="/faqs">FAQs</Link>
                <a href="http://localhost:7000/">Chatroom</a>
                <a onClick={logout}>Logout</a>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
