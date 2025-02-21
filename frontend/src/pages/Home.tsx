import { useEffect, useState } from "react";
import { getEvents } from "../services/api";
import "../pages/styles/home.css";
import {Link} from "react-router-dom";

const Home: React.FC = () => {

    return (
        <div className="home" style={{ height:"100%" }}>
            <div className="home-top">
                <h1 className="home-title">추천 초대장</h1>
                <div className="home-grid">
                    <div className="home-card">🎉 결혼식 초대</div>
                    <div className="home-card">🎂 생일 초대</div>
                    <div className="home-card">🍼 돌잔치 초대</div>
                </div>
            </div>
            <div className="home-middle">
                <Link to="/create-invitation" style={{ textDecoration: "none" }}>
                    <div className="home-middle-card">📧<br /> 초대장 만들기</div>
                </Link>
                <Link to="/my-schedule" style={{ textDecoration: "none" }}>
                    <div className="home-middle-card">📆<br /> 나의 일정</div>
                </Link>
            </div>
        </div>
    );
};

export default Home;
