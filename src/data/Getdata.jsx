import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../services/redux/product";
import { mapItem } from "../services/redux/cart";
import { fetchCategory } from "../services/redux/category";
// headless component for data inital datafeching
const Getdata = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector((store) => store.auth);
  const { productData } = useSelector((store) => store.product);

  useEffect(() => {
    // if (productData !== null) {
    //   return;
    // }
    dispatch(fetchProductData());
    dispatch(fetchCategory());
  }, []);
  useEffect(() => {
    if (userId !== "") {
      dispatch(mapItem(userId));
    }
  }, [userId]);
  return <></>;
};

export default Getdata;
