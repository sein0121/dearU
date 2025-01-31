const Home: React.FC = () => {
    return (
        <div style={{ padding: "2rem", maxWidth: "1200px", margin: "auto" }}>
            <h1 style={{ fontSize: "1.8rem", fontWeight: "bold", marginBottom: "1rem" }}>추천 초대장</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                <div style={{ padding: "1rem", boxShadow: "0px 2px 5px rgba(0,0,0,0.1)", borderRadius: "8px" }}>🎉 결혼식 초대</div>
                <div style={{ padding: "1rem", boxShadow: "0px 2px 5px rgba(0,0,0,0.1)", borderRadius: "8px" }}>🎂 생일 초대</div>
                <div style={{ padding: "1rem", boxShadow: "0px 2px 5px rgba(0,0,0,0.1)", borderRadius: "8px" }}>🍼 돌잔치 초대</div>
            </div>
        </div>
    );
};

export default Home;
