import React, {useEffect, useState} from "react";
import "../pages/styles/invitation.css";
import {getClsfTitles, saveInvitation, updateInvitation} from "../services/api";

const Invitation: React.FC = () => {
    const [clsfTitles, setClsfTitles] = useState<{ title: string; code: number }[]>([]);
    const [selectedType, setSelectedType] = useState("");
    const [selectedTab, setSelectedTab] = useState("제목");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [bgColor, setBgColor] = useState("#FFFFFF");
    const [dateTime, setDateTime] = useState("");
    const [location, setLocation] = useState("");
    const [invitationId, setInvitationId] = useState("");

    useEffect(() => {
        getClsfTitles().then((data) => setClsfTitles(data));
    }, []);

    const handleTabClick = (tab: string) => {
        setSelectedTab(tab);
    };

    const handleSave = async (field: string) => {
        let updates = {};

        switch (field) {
            case "기본":
                updates = { title, clsf: selectedType , description};
                break;
            case "배경색":
                updates = { settings: JSON.stringify({ background: bgColor }) };
                break;
            case "일정":
                updates = { schedule: dateTime };
                break;
            case "위치":
                updates = { location };
                break;
            default:
                break;
        }

        try {
            if (invitationId) {
                await updateInvitation(invitationId, updates);
                alert("저장 완료! 초대장이 업데이트되었습니다.");
            } else {
                const newInvitation = await saveInvitation({
                    title,
                    clsf: selectedType,
                    schedule: dateTime,
                    location,
                    settings: JSON.stringify({ background: bgColor }),
                    pictureId: "",
                    createdBy: "admin",
                    participantIds: "",
                    description:""
                });
                setInvitationId(newInvitation.id);
                alert("저장 완료! 초대장이 새로 저장되었습니다.");
            }
        } catch (error) {
            alert("저장 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="invi-home">
            <h1 className="home-title">📧 초대장 만들기</h1>
            <div className="preview" style={{ backgroundColor: bgColor }}>
                <h2>{title || "미리보기"}</h2>
                <p>{dateTime}</p>
                <p>{location}</p>
            </div>

            <div className="invi-settings">
                <div className="tab-menu">
                    <div className={`tab-item ${selectedTab === "기본" ? "active" : ""}`} onClick={() => handleTabClick("기본")}>
                        기본
                    </div>
                    <div className={`tab-item ${selectedTab === "배경색" ? "active" : ""}`} onClick={() => handleTabClick("배경색")}>
                        꾸미기
                    </div>
                    <div className={`tab-item ${selectedTab === "일정" ? "active" : ""}`} onClick={() => handleTabClick("일정")}>
                        일정
                    </div>
                    <div className={`tab-item ${selectedTab === "위치" ? "active" : ""}`} onClick={() => handleTabClick("위치")}>
                        위치
                    </div>
                </div>

                <div className="tab-content">
                    {selectedTab === "기본" && (
                        <div className="input-section">
                            <label>초대장 종류를 선택하세요:</label>
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                            >
                                <option value="">선택하세요</option>
                                {clsfTitles.map((item) => (
                                    <option key={item.code} value={item.title}>
                                        {item.title}
                                    </option>
                                ))}
                            </select>
                            <label>제목을 입력하세요:</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="제목을 입력하세요"
                            />
                            <label>설명을 적어주세요:</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="설명을 입력하세요"
                            />
                            <button onClick={() => handleSave("기본")}>저장</button>
                        </div>
                    )}
                    {selectedTab === "배경색" && (
                        <div className="input-section">
                            <label>배경색을 입력하세요(RGB):</label>
                            <input
                                type="color"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value)}
                            />
                            <button onClick={() => handleSave("배경색")}>저장</button>
                        </div>
                    )}
                    {selectedTab === "일정" && (
                        <div className="input-section">
                            <label>날짜와 시간을 선택하세요:</label>
                            <input
                                type="datetime-local"
                                value={dateTime}
                                onChange={(e) => setDateTime(e.target.value)}
                            />
                            <button onClick={() => handleSave("일정")}>저장</button>
                        </div>
                    )}
                    {selectedTab === "위치" && (
                        <div className="input-section">
                            <label>위치를 입력하세요:</label>
                            <input
                                type="text"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                placeholder="예: 서울시 강남구"
                            />
                            <button onClick={() => handleSave("위치")}>저장</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Invitation;
