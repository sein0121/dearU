import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { MdOutlineNotifications } from "react-icons/md"; // ✅ MDI 아이콘 추가

const Header: React.FC = () => {
    return (
        <header style={{
            width: "100%",
            maxWidth: "600px",
            height: "60px",
            backgroundColor: "#FFF7DF",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "fixed",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
            boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
        }}>
            {/* 로고 및 텍스트 (클릭 시 홈 이동) */}
            <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
                <img src={logo} alt="dearU Logo" style={{ height: "40px", marginRight: "5px", marginLeft:"5px" }} />
                <span style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>dearU</span>
            </Link>

            {/* 알림 아이콘 (클릭 시 `/notifications` 이동) */}
            <Link to="/notifications">
                <MdOutlineNotifications style={{ fontSize: "28px", color: "#333", cursor: "pointer" , marginRight:"15px"}} />
            </Link>
        </header>
    );
};

export default Header;
