import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-events" element={<h2>내 초대장 페이지</h2>} />
          <Route path="/login" element={<h2>로그인 페이지</h2>} />
        </Routes>
      </Router>
  );
};

export default App;
