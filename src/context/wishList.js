function wishlistReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.payload];

    case "remove":
      let index = state.indexOf(action.payload);

      return [...state.toSpliced(index, 1)];

    default:
      return state;
  }
}

export default wishlistReducer;
