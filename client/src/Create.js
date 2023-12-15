import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export default function Create() {
  const navigator = useNavigate();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);

  async function createNewPost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    try {
      data.set("file", files[0]);
    } catch (e) {
      alert("Enter data for all fields including the image!");
      return;
    }

    const apiUrl = "http://localhost:4000/create";
    const request = {
      method: "POST",
      body: data,
      credentials: "include",
    };
    const response = await fetch(apiUrl, request);
    if (response.ok) {
      navigator("/");
    } else {
      alert("Error creating the post!");
    }
  }

  return (
    <div>
      <h1>Create new post</h1>
      <form onSubmit={createNewPost}>
        <input
          type="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="summary"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input type="file" onChange={(e) => setFiles(e.target.files)} />
        <ReactQuill
          value={content}
          onChange={(newValue) => setContent(newValue)}
        />
        <button style={{ marginTop: "5px" }}>Create</button>
      </form>
    </div>
  );
}
