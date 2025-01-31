import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
    const location = useLocation();

    return (
        <nav style={{
            maxWidth: "600px",  // ✅ 앱 크기(600px)로 제한
            width: "100%",
            position: "fixed",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)", // ✅ 화면 중앙 정렬
            height: "60px",
            background: "#fff",
            borderTop: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            boxShadow: "0 -2px 5px rgba(0,0,0,0.1)" // ✅ 앱 느낌의 그림자 효과
        }}>

        <Link to="/" style={{ fontSize: "18px", color: location.pathname === "/" ? "blue" : "black" }}>🏠 홈</Link>
            <Link to="/my-events" style={{ fontSize: "18px", color: location.pathname === "/my-events" ? "blue" : "black" }}>📅 초대장</Link>
            <Link to="/login" style={{ fontSize: "18px", color: location.pathname === "/login" ? "blue" : "black" }}>👤 로그인</Link>
        </nav>
    );
};

export default Navbar;
