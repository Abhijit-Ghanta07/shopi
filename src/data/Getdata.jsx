import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../redux/Product";
import { mapItem } from "../redux/cart";
// headless component for data inital datafeching
const Getdata = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector((store) => store.auth);
  useEffect(() => {
    dispatch(fetchProductData());
  }, []);
  useEffect(() => {
    if (userId !== "") {
      dispatch(mapItem(userId));
    }
  }, [userId]);
  return <></>;
};

export default Getdata;
