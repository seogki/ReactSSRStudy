import logo from "./logo.svg";
import "./App.css";
import Menu from "./components/Menu";
import { Routes, Route } from "react-router-dom";
import loadable from "@loadable/component";

const RedPage = loadable(() => import("./pages/RedPage"));
const BluePage = loadable(() => import("./pages/BluePage"));
const UsersPage = loadable(() => import("./pages/UsersPage"));

// import UsersPage from "./pages/UsersPage";
// import BluePage from "./pages/BluePage";
// import RedPage from "./pages/RedPage";

function App() {
  return (
    <div>
      <Menu />
      <hr />
      <Routes>
        <Route path="/red" element={<RedPage />} />
        <Route path="/blue" element={<BluePage />} />
        <Route path="/users/*" element={<UsersPage />} />
      </Routes>
    </div>
  );
}

export default App;
