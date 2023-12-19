import React, { useState } from "react";
import { addCartItem } from "../../utils/fireStore";
import { useDispatch } from "react-redux";
import { addProduct } from "../../context/cart";

const useAddCart = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  async function addToCart(productId, userId) {
    try {
      setLoading(true);
      const id = await addCartItem(productId, userId);
      if (id) {
        dispatch(addProduct({ productId: this, quantity: 1, fireId: id }));
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return [loading, addToCart];
};

export { useAddCart };
