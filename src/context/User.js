const reducer = (state, action) => {
  switch (action.type) {
    case "setuser":
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("userid", action.userId);
      return {
        loading: false,
        loadFinish: true,
        currentUser: true,
        user: { ...action.payload },
        userId: action.userId,
      };
    case "removeuser":
      localStorage.removeItem("user");
      localStorage.removeItem("userid");
      return {
        loading: false,
        loadFinish: false,
        currentUser: false,
        user: {},
        userId: "",
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
