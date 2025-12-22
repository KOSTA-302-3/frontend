import "./BlockListPage.css";

function BlockListPage() {
  return (
    <div className="list-page">
      <h2>차단된 계정</h2>

      <div className="user-row">
        <span>blocked_user1</span>
        <button className="unblock-btn">차단 해제</button>
      </div>
    </div>
  );
}

export default BlockListPage;
