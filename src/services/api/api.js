import axiosInt from "../axios/axios";

async function fetchData(query = "", signal = "") {
  try {
    const response = await axiosInt.get(query, {
      signal: signal,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("error on data feching");
    }
  } catch (err) {
    console.log(err);
    return "failed to load data";
  }
}

export default fetchData;
