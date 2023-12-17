import "./App.css";
import Header from "./Header";
import IndexPage from "./blogs/IndexPage";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "./authentication/UserContext";
import { UserContextProvider } from "./authentication/UserContext";
import PostDetails from "./blogs/PostDetails";
import Create from "./blogs/Create";
import EditPost from "./blogs/EditPost";
import BooksPage from "./books/BooksPage";
import CreateBook from "./books/CreateBook";
import EditBook from "./books/EditBook";
import BookDetailsPage from "./books/BookDetailsPage";
import CoursesPage from "./courses/CoursesPage";
import CreateCourse from "./courses/CreateCourse";
import EditCourse from "./courses/EditCourse";
import CourseDetails from "./courses/CourseDetailsPage";
import Chat from "./chatbot/Chat";

function App() {
  return (
    <UserContextProvider>
      <main>
        <Header></Header>
        <Routes>
          {/* Routes for authentication and homepage */}
          <Route path="/" element={<Login />} />
          <Route path="/posts" element={<IndexPage />} />
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
          <Route exact path="/library" element={<BooksPage />}></Route>
          <Route path="/library/:bookId" element={<BookDetailsPage />}></Route>
          <Route path="/library/create" element={<CreateBook />}></Route>
          <Route path="/library/edit/:bookId" element={<EditBook />}></Route>
          {/* Routes for courses */}
          <Route exact path="/courses" element={<CoursesPage />}></Route>
          <Route path="/courses/:courseId" element={<CourseDetails />}></Route>
          <Route path="/courses/create" element={<CreateCourse />}></Route>
          <Route
            path="/courses/edit/:courseId"
            element={<EditCourse />}
          ></Route>
          {/* Routes for chatroom */}
          {/* Ai tutor */}
          <Route path="/tutor" element={<Chat />}></Route>
        </Routes>
      </main>
    </UserContextProvider>
  );
}

export default App;
