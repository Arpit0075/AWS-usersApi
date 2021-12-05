import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Create from "./Create";
import User from "./User";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/:id" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
