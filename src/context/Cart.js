import { addDocFireStore } from "../utils/fireStore";

function CartReducer(state, action) {
  switch (action.type) {
    case "addToCart":
      console.log(action);
      if (action.userId) {
        addDocFireStore(action.payload, action.userId);
        return [action.payload, ...state];
      } else {
        return [action.payload, ...state];
      }

    case "deleteFromCart":
      return state.filter((item) => item !== action.payload);

    case "cartReset":
      return [];

    default:
      return state;
  }
}

export default CartReducer;
