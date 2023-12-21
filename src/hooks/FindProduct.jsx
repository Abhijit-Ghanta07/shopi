import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useFindProduct = () => {
  const { firestoreProducts } = useSelector((store) => store.cart);
  const [fireId, setfireId] = useState(null);
  const findId = (productId) => {
    let product = firestoreProducts.find((item) => item.productId == productId);
    setfireId(product?.fireId);
    return product.fireId;
  };
  return [fireId, findId];
};

export default useFindProduct;
