import axios from "axios";
async function fetchData(query = "", signal = "") {
  console.log(query);
  const url = `https://api.escuelajs.co/api/v1/${query}`;
  const Res = await axios.get(url, {
    signal: signal,
  });
  if (Res.status === 200) return Res.data;
}

export default fetchData;
