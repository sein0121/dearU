import React, { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await registerUser({ username, password });
            alert(response); // 회원가입 성공 메시지
            navigate("/login"); // 회원가입 후 로그인 페이지로 이동
        } catch (error) {
            alert("회원가입 실패. 다시 시도하세요.");
        }
    };

    return (
        <div className="register-container">
            <h2>회원가입</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="아이디"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">회원가입</button>
            </form>
            <p>
                이미 계정이 있으신가요? <a href="/login">로그인</a>
            </p>
        </div>
    );
};

export default Register;
