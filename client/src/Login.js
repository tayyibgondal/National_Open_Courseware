import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Login() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const navigator = useNavigate();
  const {setUserInfo} = useContext(UserContext); 

  async function handleSubmit(e) {
    e.preventDefault();

    const apiUrl = "http://localhost:4000/login";
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    };

    const response = await fetch(apiUrl, request);
    if (response.status === 200) {
      const data = await response.json();
      setUserInfo(data);
      navigator("/");
    } else {
      alert("Invalid Credentials!");
    }
  }

  return (
    <div>
      <form className="login" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
}
