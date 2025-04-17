import React, { useEffect, useState } from "react";
import "../pages/styles/myinviList.css";
import { getInvitationAll, getClsfTitles, deleteInvitation } from "../services/api";
import { useNavigate } from "react-router-dom";

interface Invitation {
    id: string;
    title: string;
    schedule: string;
    location: string;
    description: string;
    settings: string;
    clsf?: string;
}

const MyInviList: React.FC = () => {
    const [invitations, setInvitations] = useState<Invitation[]>([]);
    const [searchType, setSearchType] = useState("전체");
    const [searchText, setSearchText] = useState("");
    const [filteredInvitations, setFilteredInvitations] = useState<Invitation[]>([]);
    const [clsfTitles, setClsfTitles] = useState<{ title: string; code: number }[]>([]);

    // 페이지네이션 상태
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [inviData, clsfData] = await Promise.all([
                    getInvitationAll(),
                    getClsfTitles()
                ]);
                setInvitations(inviData);
                setFilteredInvitations(inviData);
                setClsfTitles(clsfData);
            } catch (error) {
                console.error("초대장 목록을 불러오는 데 실패했습니다.", error);
            }
        };

        fetchData();
    }, []);

    const applySearch = () => {
        let result = invitations;

        if (searchType === "전체" && searchText) {
            const lowerText = searchText.toLowerCase();
            result = invitations.filter(item =>
                (item.title && item.title.toLowerCase().includes(lowerText)) ||
                (item.description && item.description.toLowerCase().includes(lowerText)) ||
                (item.location && item.location.toLowerCase().includes(lowerText)) ||
                (item.schedule && item.schedule.toLowerCase().includes(lowerText)) ||
                (item.clsf && item.clsf.toLowerCase().includes(lowerText))
            );
        } else if (searchType === "제목" && searchText) {
            result = invitations.filter(item =>
                item.title.toLowerCase().includes(searchText.toLowerCase())
            );
        } else if (searchType === "종류" && searchText) {
            const matchedClsf = clsfTitles.find(item => item.title === searchText);
            const matchedCode = matchedClsf?.code || "";
            result = invitations.filter(item => item.clsf === matchedCode);
        }

        setFilteredInvitations(result);
        setCurrentPage(1); // 검색 시 1페이지로 리셋
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (e.key === "Enter") {
            applySearch();
        }
    };

    const formatDate = (iso: string) => {
        const date = new Date(iso);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");

        return `${year}년 ${month}월 ${day}일 , ${hour}시 ${minute}분`;
    };


    // 현재 페이지의 초대장만 잘라서 사용
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentInvitations = filteredInvitations.slice(indexOfFirst, indexOfLast);

    // 페이지 번호 목록
    const totalPages = Math.ceil(filteredInvitations.length / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    //삭제 핸들러 추가
    const handleDelete= async (id: string)=>{
        if(window.confirm("정말 삭제하시겠습니까?")){
            try{
                await deleteInvitation(id);
                const updatedList = invitations.filter(inv => inv.id !==id);
                setInvitations(updatedList);
                setFilteredInvitations(updatedList);
                alert("삭제되었습니다.");
            }catch (e) {
                alert("삭제에 실패했습니다.");
                console.error(e);
            }
        }
    }

    //수정 핸들러
    const navigate = useNavigate();

    // const handleEdit = (id:string)=>{
    //     navigate(`/invitation?id=${id}`);
    // }

    return (
        <div className="list-home" style={{ height: "100%" }}>
            <div className="list-top">
                <div className="list-header">
                    <h1 className="list-title">📋 나의 초대장 목록</h1>
                </div>
                <div className="search-bar">
                    <select value={searchType} onChange={(e) => {
                        setSearchType(e.target.value);
                        setSearchText("");
                    }}>
                        <option value="전체">전체</option>
                        <option value="제목">제목</option>
                        <option value="종류">종류</option>
                    </select>

                    {searchType === "종류" ? (
                        <select
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={handleKeyPress}
                        >
                            <option value="">선택하세요</option>
                            {clsfTitles.map((item) => (
                                <option key={item.code} value={item.title}>
                                    {item.title}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder={`${searchType} 검색`}
                        />
                    )}

                    <button className="search-button" onClick={applySearch}>
                        검색
                    </button>
                </div>
            </div>

            <div className="list-middle">
                {currentInvitations.map((item) => (
                    <div key={item.id} className="invitation-card">
                        <div className="invitation-card-header">
                            <div className="invitation-detail-title">{item.title}</div>
                            <div className="invitation-detail-button">
                                <button className="edit-button" onClick={()=> navigate(`/invitation?id=${item.id}`)}>수정</button>
                                <button className="delete-button" onClick={()=> handleDelete(item.id)}>삭제</button>
                            </div>
                        </div>
                        <div className="invitation-detail-detail">{formatDate(item.schedule)}</div>
                        <div className="invitation-detail-detail">{item.location}</div>
                        <div className="invitation-detail-detail">{item.description}</div>
                    </div>
                ))}
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
                <div className="pagination">
                    {pageNumbers.map((number) => (
                        <button
                            key={number}
                            className={`page-button ${currentPage === number ? "active" : ""}`}
                            onClick={() => setCurrentPage(number)}
                        >
                            {number}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyInviList;
