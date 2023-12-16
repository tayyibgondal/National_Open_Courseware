import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../useFetch";
import { UserContext } from "../authentication/UserContext";

export default function CourseDetails() {
  const { userInfo } = useContext(UserContext);
  const { courseId } = useParams();
  const { data } = useFetch(`http://localhost:4000/courses/${courseId}`);
  const navigator = useNavigate();

  // async function handleDelete(e) {
  //   e.preventDefault();
  //   const apiUrl = `http://localhost:4000/delete/${courseId}`;
  //   const req = {
  //     method: "DELETE",
  //   };
  //   const response = await fetch(apiUrl, req);
  //   if (response.ok) {
  //     navigator("/courses");
  //   } else {
  //     alert("The course could not be deleted!");
  //   }
  // }

  return (
    <div className="course-details">
      {data && (
        <div>
          <h1>{data.name}</h1>
          <p>
            Instructor:&nbsp;
            {data.instructor}
          </p>
          <p>
            Email:&nbsp;
            {data.email}
          </p>
          <p>
            University:&nbsp;
            {data.university}
          </p>
          <p>
            Year:&nbsp;
            {data.year}
          </p>
          <div className="course-info">
            {userInfo.id === data.uploader._id && (
              <div className="edit-row">
                <Link to={`/courses/edit/${data._id}`} className="Edit">
                  Edit
                </Link>
              </div>
            )}
            <div
              className="summary"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
            <div className="download">
         
              <a
                href={`http://localhost:4000/uploads/${
                  data.content.split("\\")[1]
                }`}
                download
                target="_blank"
              >
                Click to download!
              </a>
            </div>
            <div className="author">
              By:&nbsp;
              {data.uploader.username}
            </div>
            <time>
              Created at:&nbsp;
              {formatISO9075(new Date(data.createdAt))}
            </time>
          </div>
        </div>
      )}
    </div>
  );
}
