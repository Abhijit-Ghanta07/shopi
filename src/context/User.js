const reducer = (state, action) => {
  switch (action.type) {
    case "setuser":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...action.payload,
      };
    case "removeuser":
      localStorage.removeItem("user");
      return {};

    default:
      return state;
  }
};

export default reducer;
