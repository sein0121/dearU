import React, { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await loginUser({ username, password });
            alert(response); // 로그인 성공 메시지
            navigate("/");   // 로그인 성공 시 홈으로 이동
        } catch (error) {
            alert("로그인 실패. 다시 시도하세요.");
        }
    };

    return (
        <div className="login-container">
            <h2>로그인</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit">로그인</button>
            </form>
            <p>
                계정이 없으신가요? <a href="/register">회원가입</a>
            </p>
        </div>
    );
};

export default Login;
