import './ListContent.css';

function FollowList({ list }) {
  if (!list || list.length === 0) {
    return <div className="empty">표시할 유저가 없습니다.</div>;
  }

  return (
    <div className="list-body">
      {list.map(user => (
        <div className="list-item" key={user.userId}>
          <img src={user.profileImage} className="avatar" />

          <div className="info">
            <div className="username">{user.username}</div>
          </div>

          <button>메시지</button>
        </div>
      ))}
    </div>
  );
}

export default FollowList;
