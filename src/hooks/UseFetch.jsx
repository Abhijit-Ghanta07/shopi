import { useEffect, useState } from "react";
import axiosInt from "../services/axios/axios";

const useFetch = (query) => {
  const [loading, setLoding] = useState(false);
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    // initilize abort controller
    const abortController = new AbortController();
    // set the url
    // const url = `https://api.escuelajs.co/api/v1/${query}`;
    // declare fetchdata function
    const fetchApiData = async () => {
      try {
        setLoding(true);
        const response = await axiosInt.get(query, {
          signal: abortController.signal,
        });
        if (response.status == 200) {
          setData(response.data);
        } else {
          throw new Error("server error");
        }
      } catch (error) {
        setErr(true);
      } finally {
        setLoding(false);
      }
    };
    fetchApiData();
    return () => {
      abortController.abort();
    };
  }, [query]);

  // return data
  return { data, loading, err };
};

export default useFetch;
