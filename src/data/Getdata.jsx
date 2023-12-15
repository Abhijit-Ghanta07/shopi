import React, { useContext, useEffect } from "react";
import fetchData from "../api/api";
import { StoreContext } from "../context/store";

const Getdata = () => {
  const {
    product: [productstate, dispatch],
  } = useContext(StoreContext);

  useEffect(() => {
    // declare abortcontrolller
    let abortController = new AbortController();

    async function fetchProduct() {
      let products = await fetchData("products", abortController.signal);
      dispatch({ type: "setproduct", payload: products });
    }
    fetchProduct();
    return () => {
      // abort the datafetching
      abortController.abort();
    };
  }, []);

  return <></>;
};

export default Getdata;
