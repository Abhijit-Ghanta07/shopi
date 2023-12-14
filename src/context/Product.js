function ProductReducer(state, action) {
  switch (action.type) {
    case "setproduct":
      return (state = action.payload);

    default:
      return state;
  }
}

export default ProductReducer;
