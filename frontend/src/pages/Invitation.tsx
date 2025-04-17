import React, { useEffect, useState } from "react";
import "../pages/styles/invitation.css";
import { getClsfTitles, saveInvitation, updateInvitation, getInvitationById } from "../services/api";
import { useSearchParams } from "react-router-dom";

const Invitation: React.FC = () => {
    const [clsfTitles, setClsfTitles] = useState<{ title: string; code: number }[]>([]);
    const [selectedType, setSelectedType] = useState("");
    const [selectedTab, setSelectedTab] = useState("기본");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [bgColor, setBgColor] = useState("#FFFFFF");
    const [dateTime, setDateTime] = useState("");
    const [location, setLocation] = useState("");
    const [invitationId, setInvitationId] = useState("");

    // 일정
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const [ampm, setAmpm] = useState("오전");
    const [errors, setErrors] = useState({
        year: false,
        month: false,
        day: false,
        hour: false,
        minute: false,
        dateMessage: ""
    });

    //초대장 수정 시
    const [searchParams] = useSearchParams();
    const invitationIdFromParams = searchParams.get("id");

    useEffect(() => {
        getClsfTitles().then((data) => setClsfTitles(data));
    }, []);

    useEffect(() => {
        console.log("에러 상태 업데이트:", errors);
    }, [errors]);

    //초대장 수정 시
    useEffect(() => {
        if (invitationIdFromParams) {
            getInvitationById(invitationIdFromParams).then((data) => {
                setInvitationId(data.id);
                setTitle(data.title);
                setDescription(data.description);
                setLocation(data.location);

                const match = clsfTitles.find(c => c.code.toString() === data.clsf);
                setSelectedType(match ? match.title : "");

                // 배경색 추출
                if (data.settings) {
                    const settings = JSON.parse(data.settings);
                    if (settings.background) {
                        setBgColor(settings.background);
                    }
                }

                // 날짜/시간 분해
                if (data.schedule) {
                    const date = new Date(data.schedule);
                    const y = date.getFullYear();
                    const m = date.getMonth() + 1;
                    const d = date.getDate();
                    let h = date.getHours();
                    const min = date.getMinutes();

                    const ampmStr = h < 12 ? "오전" : "오후";
                    h = h % 12 === 0 ? 12 : h % 12;

                    setYear(String(y));
                    setMonth(String(m).padStart(2, "0"));
                    setDay(String(d).padStart(2, "0"));
                    setHour(String(h).padStart(2, "0"));
                    setMinute(String(min).padStart(2, "0"));
                    setAmpm(ampmStr);
                }
            });
        }
    }, [invitationIdFromParams, clsfTitles]);

    const handleTabClick = (tab: string) => setSelectedTab(tab);

    const formatWithLeadingZero = (value: string) => {
        const num = parseInt(value, 10);
        if (isNaN(num)) return "";
        return num < 10 ? `0${num}` : `${num}`;
    };

    const isValidDate = (y: number, m: number, d: number) => {
        const date = new Date(y, m - 1, d);
        return (
            date.getFullYear() === y &&
            date.getMonth() === m - 1 &&
            date.getDate() === d
        );
    };

    const isValidTime = (h: number, min: number) => {
        return h >= 1 && h <= 12 && min >= 0 && min < 60;
    };

    const handleNumericInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'];
        if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
            e.preventDefault();
        }
    };

    const handleSave = async () => {
        const y = parseInt(year, 10);
        const m = parseInt(month, 10);
        const d = parseInt(day, 10);
        const h = parseInt(hour, 10);
        const min = parseInt(minute, 10);

        const newErrors = {
            year: isNaN(y),
            month: isNaN(m) || m < 1 || m > 12,
            day: isNaN(d),
            hour: isNaN(h) || h < 1 || h > 12,
            minute: isNaN(min) || min < 0 || min >= 60,
            dateMessage: ""
        };
        setErrors(newErrors);

        if (!isValidDate(y, m, d)) {
            newErrors.day = true;
            newErrors.dateMessage = "유효하지 않은 날짜입니다.";
        }

        if (!isValidTime(h, min)) {
            newErrors.hour = true;
            newErrors.minute = true;
            newErrors.dateMessage = "시간 또는 분이 잘못되었습니다.";
        }

        const hasError = Object.values(newErrors).some((v) => v === true || v === "유효하지 않은 날짜입니다." || v === "시간 또는 분이 잘못되었습니다.");
        if (hasError) {
            console.log("유효성 검사 실패:", newErrors);

            return;
        }
        setErrors({ year: false, month: false, day: false, hour: false, minute: false, dateMessage: "" });


        const hour24 = ampm === "오후" && h < 12 ? h + 12 : (ampm === "오전" && h === 12 ? 0 : h);

        const formattedSchedule = `${year}-${formatWithLeadingZero(month)}-${formatWithLeadingZero(day)}T${formatWithLeadingZero(
            hour24.toString()
        )}:${formatWithLeadingZero(minute)}`;

        setDateTime(formattedSchedule);

        const updates = {
            title,
            clsf: selectedType,
            description,
            settings: JSON.stringify({ background: bgColor }),
            schedule: formattedSchedule,
            location
        };

        try {
            if (invitationId) {
                await updateInvitation(invitationId, updates);
                alert("업데이트 완료!");
            } else {
                const newInvitation = await saveInvitation({
                    ...updates,
                    pictureId: "",
                    createdBy: "admin",
                    participantIds: ""
                });
                setInvitationId(newInvitation.id);
                alert("저장 완료!");
            }
        } catch (error) {
            alert("저장 중 오류가 발생했습니다.");
        }
    };

    const getReadableDateTime = () => {
        if (!dateTime) return "";
        const date = new Date(dateTime);
        const y = date.getFullYear();
        const m = date.getMonth() + 1;
        const d = date.getDate();
        let h = date.getHours();
        const min = date.getMinutes();
        const ampmStr = h < 12 ? "오전" : "오후";
        h = h % 12 === 0 ? 12 : h % 12;

        return `${y}년 ${m}월 ${d}일 ${ampmStr} ${h}시 ${min < 10 ? `0${min}` : min}분`;
    };

    return (
        <div className="invi-home">
            <h1 className="home-title">
                {invitationIdFromParams ? "📄 초대장 수정" : "📧 초대장 만들기"}
            </h1>
            <div className="preview" style={{ backgroundColor: bgColor }}>
                <h2>{title || "미리보기"}</h2>
                <p>{getReadableDateTime()}</p>
                <p>{location}</p>
            </div>

            <div className="invi-settings">
                <div className="tab-menu">
                    {["기본", "배경색", "일정", "위치"].map((tab) => (
                        <div
                            key={tab}
                            className={`tab-item ${selectedTab === tab ? "active" : ""}`}
                            onClick={() => handleTabClick(tab)}
                        >
                            {tab}
                        </div>
                    ))}
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
                        </div>
                    )}

                    {selectedTab === "일정" && (
                        <div className="input-section">
                            <label>날짜와 시간을 입력하세요:</label>
                            <div className="datetime-row">
                                <input
                                    className={errors.year ? "error-input" : ""}
                                    type="text"
                                    placeholder="년 (YYYY)"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    onKeyDown={handleNumericInput}
                                    maxLength={4}
                                />
                                <input
                                    className={errors.month ? "error-input" : ""}
                                    type="text"
                                    placeholder="월 (MM)"
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                    onKeyDown={handleNumericInput}
                                    maxLength={2}
                                />
                                <input
                                    className={errors.day ? "error-input" : ""}
                                    type="text"
                                    placeholder="일 (DD)"
                                    value={day}
                                    onChange={(e) => setDay(e.target.value)}
                                    onKeyDown={handleNumericInput}
                                    maxLength={2}
                                />
                            </div>
                            <div className="datetime-row" style={{ marginTop: "0.5rem" }}>
                                <select value={ampm} onChange={(e) => setAmpm(e.target.value)}>
                                    <option value="오전">오전</option>
                                    <option value="오후">오후</option>
                                </select>
                                <input
                                    className={errors.hour ? "error-input" : ""}
                                    type="text"
                                    placeholder="시 (hh)"
                                    value={hour}
                                    onChange={(e) => setHour(e.target.value)}
                                    onKeyDown={handleNumericInput}
                                    maxLength={2}
                                />
                                <input
                                    className={errors.minute ? "error-input" : ""}
                                    type="text"
                                    placeholder="분 (mm)"
                                    value={minute}
                                    onChange={(e) => setMinute(e.target.value)}
                                    onKeyDown={handleNumericInput}
                                    maxLength={2}
                                />
                            </div>
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
                        </div>
                    )}
                </div>
            </div>

            <div className="save-button-container">
                <button className="save-button" onClick={handleSave}>저장</button>
            </div>
        </div>
    );
};

export default Invitation;
