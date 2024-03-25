import axios from "../axios/axios";

async function fetchData(query = "", signal = "") {
  console.log(query);
  const response = await axios.get(query, {
    signal: signal,
  });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error("error on data feching");
  }
}

export default fetchData;
