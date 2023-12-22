import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../useFetch";
import { UserContext } from "../authentication/UserContext";
import Footer from "../Footer";

export default function CareerPathDetails() {
  const { userInfo } = useContext(UserContext);
  const navigator = useNavigate();
  const { careerId } = useParams();
  const { data, canAccess } = useFetch(
    `http://localhost:4000/careerpaths/${careerId}`
  );

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this career path?"
    );
    if (confirmDelete) {
      try {
        const apiUrl = `http://localhost:4000/careerpaths/delete/${careerId}`;
        const req = {
          method: "DELETE",
          credentials: "include",
        };
        const response = await fetch(apiUrl, req);
        if (response.ok) {
          navigator("/careers");
        } else {
          alert("The career path could not be deleted!");
        }
      } catch (error) {
        console.error(error);
        alert("Error deleting the career path!");
      }
    }
  };

    return (
      <div>
        {canAccess && data && (
          <div className="course-details">
            <div>
              <h1>{data.title}</h1>
              <button onClick={() => navigator(-1)}>Go Back</button>
              <div
                className="summary"
                dangerouslySetInnerHTML={{ __html: data.description }}
              />
              <div className="download">
                <a
                  href={`http://localhost:4000/uploads/${
                    data.file.split("\\")[1]
                  }`}
                  download
                  target="_blank"
                  className="button full-width"
                >
                  Click to download!
                </a>
              </div>

              <div className="button-container">
                <Link
                  to={`/careers/edit/${careerId}`}
                  className="button full-width Edit"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="button full-width Delete"
                >
                  Delete
                </button>
              </div>
              <Footer></Footer>
            </div>
          </div>
        )}
      </div>
    );
}
