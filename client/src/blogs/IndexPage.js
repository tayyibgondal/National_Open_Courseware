import { useEffect, useState } from "react";
import Post from "./Post";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [query, setQuery] = useState("");
  const { data: posts, setData: setPosts } = useFetch(
    "http://127.0.0.1:4000/posts"
  );

  async function searchPosts(e) {
    e.preventDefault();
    // If the query is empty
    if (!query.trim()) {
      // If empty query made.
      // Make a fetch req to /posts endpoint
      const response = await fetch('http://localhost:4000/posts')
      if (response.ok) {
        const newData = await response.json();
        setPosts(newData);
        console.log('done');
      } 
      // setPosts(updatedPosts);
      return;
    }
    try {
      const apiUrl = `http://localhost:4000/posts/search/${query}`;
      const response = await fetch(apiUrl);

      // Check for successful response (status code 2xx)
      if (response.ok) {
        const result = await response.json();
        setPosts(result);
      } else {
        // Handle specific HTTP status codes
        if (response.status === 404) {
          alert("No results found.");
        } else {
          alert("Couldn't resolve query. Please try again later.");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again later.");
    }
  }

  return (
    <div className="list-page">
      <div class="edit-row">
        <h1>Posts</h1>
        <div>
          <Link to={`/create`} className="create">
            Create new post
          </Link>
        </div>
      </div>

      <form className="search" onSubmit={searchPosts}>
        <input
          className="search"
          type="text"
          placeholder="Search blogs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          id=""
        />
        <div>
          <input type="submit" value="Search" />
        </div>
      </form>

      {posts && posts.map((post) => <Post {...post} />)}
    </div>
  );
}
