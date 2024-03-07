import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistedStore } from "./redux/Reduxstore";
import { ScrollTop } from "./utils/Utill";

import { BrowserRouter as Router } from "react-router-dom";
// css
import "./sass/main.scss";
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <Router>
          <ScrollTop />
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </>
);
