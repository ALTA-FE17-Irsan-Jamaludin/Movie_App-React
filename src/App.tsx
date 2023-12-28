import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Favorite from "./Favorite";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/favorite" element={<Favorite />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
