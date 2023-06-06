import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
import Doctor from "./Doctor";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor/:id" element={<Doctor />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
