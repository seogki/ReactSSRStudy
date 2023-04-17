import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import rootReducer, { rootSaga } from "./modules";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import createSagaMiddleware from "redux-saga";
import { loadableReady } from "@loadable/component";
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  window.__PRELOADED_STATE__,
  applyMiddleware(thunk, sagaMiddleware)
);
sagaMiddleware.run(rootSaga);
const root = ReactDOM.createRoot(document.getElementById("root"));
async function render() {
  if (process.env.NODE_ENV === "production") {
    await loadableReady();
  }
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}
render();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
