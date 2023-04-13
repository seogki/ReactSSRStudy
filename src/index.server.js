import ReactDOMServer from "react-dom/server";
import express from "express";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
// import { default as App } from "./App";
import path from "path";
import fs from "fs";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "./modules";
import thunk from "redux-thunk";
import PreloadContext from "./lib/PreloadContext";
const manifest = JSON.parse(
  fs.readFileSync(path.resolve("./build/asset-manifest.json"), "utf-8")
);

function createPage(root, stateScript) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8/>
      <link rel="shortcut icon" href="/favicon.ico"/>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,shrink-to-fit=no"
      />
      <meta name="theme-color" content="#000000" />
      <title>React App</title>
      <link href="${manifest.files["main.css"]}" rel="stylesheet" />
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app. </noscript>
      <div id="root">${root}</div>
      ${stateScript}
      <script src="${manifest.files["main.js"]}"></script>
    </body>
    </html>
    `;
}

const app = express();
const serverRender = async (req, res, next) => {
  const context = {};
  const store = createStore(rootReducer, applyMiddleware(thunk));
  const preloadContext = {
    done: false,
    promises: [],
  };
  const jsx = (
    <PreloadContext.Provider value={preloadContext}>
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    </PreloadContext.Provider>
  );
  ReactDOMServer.renderToStaticMarkup(jsx);
  try {
    await Promise.all(preloadContext.promises);
  } catch (e) {
    return res.status(500);
  }
  preloadContext.done = true;
  const root = ReactDOMServer.renderToString(jsx);
  const stateString = JSON.stringify(store.getState()).replace(/</g, "\\u003c");
  const stateScript = `<script>__PRELOADED_STATE__ = ${stateString}</script>`; //리덕스 초기 상태를 주입
  res.send(createPage(root, stateScript));
};

app.listen(5001, () => {
  console.log("Running on http://localhost:5001");
});

const serve = express.static(path.resolve("./build"), {
  index: false,
});
app.use(serve);
app.use(serverRender);
