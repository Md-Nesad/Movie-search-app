import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SinglePage from "./component/SinglePage";
import Home from "./component/Home";
import "./index.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/singleMovie/:id" element={<SinglePage />}></Route>
      </Routes>
    </Router>
  );
}
