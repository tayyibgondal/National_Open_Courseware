import "./App.css";
import Header from "./Header";
import IndexPage from "./IndexPage";
import Login from "./Login";
import Register from "./Register";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "./UserContext";
import { UserContextProvider } from "./UserContext";
import PostDetails from "./PostDetails";
import Create from "./Create";
import EditPost from "./EditPost";

function App() {
  return (
    <UserContextProvider>
      <main>
        <Header></Header>
        <Routes>
          {/* Routes for authentication and homepage */}
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* ======================================== Faras's Part ===================================== */}
          {/* For the following tasks if logged in user is admin, he/she can delete as well as view records */}
          {/* Donate */}
          {/* Career paths */}
          {/* FAQs */}
          {/* Contact us */}
          {/* ======================================== Tayyib's Part ===================================== */}
          {/* Routes for blogs */}
          <Route path="/create" element={<Create />}></Route>
          <Route path="/post/:postId" element={<PostDetails />}></Route>
          <Route path="/edit/:postId" element={<EditPost />}></Route>
          {/* Routes for books */}
          {/* Routes for courses */}
          {/* Routes for chatroom */}
        </Routes>
      </main>
    </UserContextProvider>
  );
}

export default App;
