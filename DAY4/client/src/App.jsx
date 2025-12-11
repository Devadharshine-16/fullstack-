import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Booklist from "./Booklist";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <h1>My Book App</h1>

        <nav>
          <ul className="nav-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/booklist">Book List</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booklist" element={<Booklist />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
