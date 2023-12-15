function ToastReducer(state, action) {
  switch (action.type) {
    case "open":
      return { show: true, message: action.payload };
    case "close":
      return { ...state, show: false };

    default:
      return state;
  }
}

export default ToastReducer;
