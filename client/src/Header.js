import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./authentication/UserContext";

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigator = useNavigate();

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
          <Link to="/tutor">AI Tutor</Link>
          <Link to="/posts">Blogs</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/library">Books</Link>
          <Link to="/chatroom">Chatroom</Link>
          <a onClick={logout}>Logout</a>
        </nav>
      )}
    </header>
  );
}
