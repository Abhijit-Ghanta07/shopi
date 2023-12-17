import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProductData } from "../context/Product";

const Getdata = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProductData());
  }, []);
  // useEffect(() => {
  //   // declare abortcontrolller
  //   let abortController = new AbortController();

  //   async function fetchProduct() {
  //     let products = await fetchData("products", abortController.signal);
  //     // dispatch({ type: "setproduct", payload: products });
  //   }
  //   return () => {
  //     // abort the datafetching
  //     abortController.abort();
  //   };
  // }, []);

  return <></>;
};

export default Getdata;
