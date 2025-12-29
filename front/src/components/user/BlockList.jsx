import { useNavigate } from 'react-router-dom';
import './ListContent.css';
import axiosInstance from '../../api/axiosInstance';

function BlockList({ users, setUsers, posts, tab }) {
  const nav = useNavigate();

  const unblock = (userId) => {
    if (!confirm("차단 해제하시겠습니까?")) return;

    axiosInstance({
      url: `/api/block/USER/${userId}`,
      method: "DELETE",
    })
      .then(() => {
        alert("차단 해제했습니다.");
        setUsers(prev => prev.filter(u => u.userId !== userId));
      })
      .catch(() => {
        alert("차단 해제 실패");
      });
  }

  if (tab === 0) {
    if (!users || users.length === 0) {
      return <div className="empty">차단한 유저가 없습니다.</div>;
    }

    return (
      <div className="list-body">
        {users.map(user => (
          <div className="list-item" key={user.id}>
            <img src={user.profileImage} className="avatar"/>

            <div className="info" onClick={() => nav("/user/" + user.userId)}>
              <div className="username">{user.username}</div>
            </div>

            <button onClick={() => unblock(user.userId)}>차단 해제</button>
          </div>
        ))}
      </div>
    );
  }

  // tab === 1 (게시물)
  if (!posts || posts.length === 0) {
    return <div className="empty">차단한 게시물이 없습니다.</div>;
  }

  return (
    <div className="list-body">
      {posts.map(post => (
        <div className="list-item" key={post.id}>
          <img src={post.thumbnail} className="thumbnail" />

          <div className="info">
            <div className="content">{post.content}</div>
          </div>

          <button>차단 해제</button>
        </div>
      ))}
    </div>
  );
}

export default BlockList;
