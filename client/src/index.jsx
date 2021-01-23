import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorkerRegistration";
import rootReducer from "./store/reducers/rootReducer";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    {" "}
    <App />{" "}
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register({
  onUpdate: (registration) => {
    registration?.postMessage({ type: "SKIP_WAITING" });
    window.location.reload();
  },
});
