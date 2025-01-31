import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <nav style={{ padding: "1rem", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "1200px", margin: "auto" }}>
                <Link to="/" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>dearU</Link>
                <div>
                    <Link to="/my-events" style={{ marginRight: "10px" }}>내 초대장</Link>
                    <Link to="/login">로그인</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
