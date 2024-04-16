import { Button } from "react-bootstrap";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem } from "../../../services/redux/cart";
import { ToastOpen } from "../../../services/redux/Toast";
import { useNavigate } from "react-router-dom";
import useFindProduct from "../../../hooks/FindProduct";

const BuyBtn = ({ id, className, ...rest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [, findId] = useFindProduct();
  const { productsID } = useSelector((store) => store.cart);
  const { userId } = useSelector((store) => store.auth);

  function handleAddClick(evt) {
    if (!userId) {
      return navigate("/auth");
    }
    try {
      dispatch(addItem({ productId: evt, userId: userId }));
      dispatch(ToastOpen("Product Added To Cart"));
    } catch (err) {
      console.log(err);
      dispatch(ToastOpen("Something went Wrong"));
    }
  }
  function handleRemoveClick(evt) {
    const ID = findId(evt);
    if (ID) {
      dispatch(deleteItem({ productId: evt, fireId: ID }));
      dispatch(ToastOpen("Product Remove From Cart"));
    }
  }

  return (
    <>
      {productsID.includes(id) ? (
        <Button
          variant="danger"
          className="w-100"
          size="sm"
          {...rest}
          onClick={handleRemoveClick.bind("", id)}
        >
          Remove from Cart
        </Button>
      ) : (
        <Button
          className="w-100"
          size="sm"
          {...rest}
          onClick={handleAddClick.bind("", id)}
        >
          Add to Cart
        </Button>
      )}
    </>
  );
};

export default BuyBtn;
