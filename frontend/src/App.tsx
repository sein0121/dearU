import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

const App: React.FC = () => {
    return (
        <Router>  {/* ✅ Router를 최상위에 배치 */}
            <div style={{
                maxWidth: "600px",
                width: "100%",
                height: "100vh",
                margin: "0 auto",
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)"
            }}>
                <Header />  {/* ✅ Router 내부에서 사용 */}

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/my-events" element={<h2>내 초대장</h2>} />
                    <Route path="/login" element={<h2>로그인</h2>} />
                </Routes>

                <Navbar />  {/* ✅ Router 내부에서 사용 */}
            </div>
        </Router>
    );
};

export default App;
