import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";

import "./app.scss";
import App from "./App.tsx";
import { store } from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
