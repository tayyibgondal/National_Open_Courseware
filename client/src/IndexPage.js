import { useEffect, useState } from "react";
import Post from "./Post";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const { data: posts, setData: setPosts } = useFetch(
    "http://127.0.0.1:4000/posts"
  );
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
      {posts && posts.map((post) => <Post {...post} />)}
    </div>
  );
}
