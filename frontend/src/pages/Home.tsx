import { useEffect, useState } from "react";
import { getEvents } from "../services/api";
import "../pages/styles/home.css";
import {Link} from "react-router-dom";

const Home: React.FC = () => {
    const [events, setEvents] = useState<{ title: string; description: string }[]>([]);

    useEffect(() => {
        getEvents().then((data) => setEvents(data));
    }, []);

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
                <Link to="/special-invitation">
                    <img src="/assets/heart2.gif" alt="스페셜 초대장" className="home-gif" />
                </Link>
            </div>
        </div>
    );
};

export default Home;
