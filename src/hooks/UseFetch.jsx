import { useEffect, useState } from "react";

const useFetch = (query) => {
  const [loading, setLoding] = useState(false);
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    // initilize abort controller
    const abortController = new AbortController();
    // set the url
    const url = `https://api.escuelajs.co/api/v1/${query}`;
    // declare fetchdata function
    async function fetchData() {
      console.log(query);
      setLoding(true);
      const Res = await axios.get(url, {
        signal: abortController.signal,
      });
      if (Res.status === 200) {
        setData(Res.data);
        setLoding(false);
      }
    }
    fetchData().catch((err) => {
      setErr(true);
      setLoding(false);
    });

    return () => {
      abortController.abort();
    };
  }, [query]);
  return { loading, data, err };
};

export default useFetch;
