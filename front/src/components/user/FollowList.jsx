import { useNavigate } from 'react-router-dom';
import './ListContent.css';
import axiosInstance from '../../api/axiosInstance';

function FollowList({ list }) {
  const nav = useNavigate();

    const makeChatroom = (userId) => {
      axiosInstance({
        url: `/api/chatroom/${userId}`,
        method: "POST",
      })
        .then((res) => {
          nav(`/chat/${res.chatroomId}`);
        })
        .catch(() => {
          alert("메시지를 보낼 수 없습니다.");
        });
    };
  

  if (!list || list.length === 0) {
    return <div className="empty">표시할 유저가 없습니다.</div>;
  }

  return (
    <div className="list-body">
      {list.map(user => (
        <div className="list-item" key={user.userId} onClick={() => nav("/user/" + user.userId)}>
          <img src={user.profileImage} className="avatar" />

          <div className="info">
            <div className="username">{user.username}</div>
          </div>

          <button onClick={() => makeChatroom(user.userId)}>메시지</button>
        </div>
      ))}
    </div>
  );
}

export default FollowList;
