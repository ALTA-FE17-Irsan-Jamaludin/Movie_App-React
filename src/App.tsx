import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Favorite from "./Favorite";
import Detail from "./Detail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/favorite" element={<Favorite />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
