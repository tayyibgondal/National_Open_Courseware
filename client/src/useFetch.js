import { useContext, useEffect, useState } from "react";
import { UserContext } from "./authentication/UserContext";
import { useNavigate } from "react-router-dom";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const { userInfo } = useContext(UserContext);
  const navigator = useNavigate();
  const [canAccess, setCanAccess]= useState(null);

  useEffect(() => {
    // Authenticate the user before collecting data from database
    
    setCanAccess(true);

    const fetchData = async () => {
      const response = await fetch(url, {
        headers: {
          credentials: "include",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setData(data);
      } else {
        alert("Could not fetch data!");
      }
    };
    fetchData();
  }, [url]);
  return { data, setData, canAccess };
}
