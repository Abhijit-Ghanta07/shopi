function CartReducer(state, action) {
  switch (action.type) {
    case "addToCart":
      return [action.payload, ...state];

    case "deleteFromCart":
      return state.filter((item) => item !== action.payload);

    default:
      return state;
  }
}

export default CartReducer;
