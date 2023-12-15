import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      if (response.status === 200) {
        const data = await response.json();
        setData(data);
      } else {
        alert("Could not fetch data!");
      }
    };

    fetchData();
  }, [url]);

  return { data, setData };
}
