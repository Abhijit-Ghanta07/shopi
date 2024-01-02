import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../redux/product";
import { mapItem } from "../redux/cart";
import { fetchCategory } from "../redux/category";
// headless component for data inital datafeching
const Getdata = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector((store) => store.auth);
  useEffect(() => {
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
