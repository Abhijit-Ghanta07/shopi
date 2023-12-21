import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const useFetchData = (query) => {
  const [loading, setLoding] = useState(false);
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const url = `https://api.escuelajs.co/api/v1/${query}`;
    async function fetchData() {
      console.log(query);
      try {
        setLoding(true);
        const Res = await axios.get(url, {
          signal: abortController.signal,
        });
        if (Res.status === 200) {
          setData(Res.data);
          setLoding(false);
        }
      } catch (err) {
        setErr(true);
      }
    }
    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);
  return { loading, data, err };
};

export default useFetchData;

export async function fetchData(query = "", signal = "") {
  console.log(query);
  const url = `https://api.escuelajs.co/api/v1/${query}`;
  const Res = await axios.get(url, {
    signal: signal,
  });
  if (Res.status === 200) return Res.data;
}
