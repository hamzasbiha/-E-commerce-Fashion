import axios from "axios";
import { useEffect, useState } from "react";
import { makeRequest } from "../MakeRequest";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setIsLoding] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoding(true);
        const response = await makeRequest.get(url);
        setData(response.data);
      } catch (error) {
        setError(true);
      }
      setIsLoding(false);
    };
    fetchData();
  }, [url]);
  return { data, loading, error };
};

export default useFetch;
