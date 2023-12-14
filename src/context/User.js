const reducer = (state, action) => {
  switch (action.type) {
    case "setuser":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        loading: false,
        loadFinish: true,
        currentUser: true,
        user: { ...action.payload },
      };
    case "removeuser":
      localStorage.removeItem("user");
      return {
        loading: false,
        loadFinish: false,
        currentUser: false,
        user: {},
      };
    case "setloading":
      return { ...state, loading: true, loadFinish: false };
    case "loadfinish":
      return { ...state, loading: false, loadFinish: true };
    default:
      return state;
  }
};

export default reducer;
