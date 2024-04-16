import React, { useMemo, useState } from "react";

const useMaxPrice = (data = []) => {
  let price = 0;
  const maxprice = useMemo(() => {
    return data?.forEach((ele, index) => {
      if (ele?.price > price) {
        price = ele.price;
        return price;
      }
      return price;
    });
  }, [data]);

  return { maxprice };
};

export default useMaxPrice;
