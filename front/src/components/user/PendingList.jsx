import { useNavigate } from "react-router-dom";
import "./ListContent.css";
import axiosInstance from "../../api/axiosInstance";
import Badge from "../common/Badge";

function PendingList({ list }) {
  const nav = useNavigate();

  const approve = (userId) => {
    axiosInstance({
      url: `/api/follow/${userId}`,
      method: "PUT",
    })
      .catch(() => {
        alert("승인 실패");
      });
  };

  const reject = (userId) => {
    axiosInstance({
      url: `/api/follow/refuse/${userId}`,
      method: "DELETE",
    })
      .catch(() => {
        alert("거절 실패");
      });
  }

  if (list.length === 0 || !list) {
    return <div className="empty">표시할 유저가 없습니다.</div>;
  }

  return (
    <div className="list-body">
      {list.map((user) => (
        <div
          className="list-item"
          key={user.userId}
        >
          <img src={user.profileImage} className="avatar" />

          <div className="info" onClick={() => nav("/user/" + user.userId)}>
            <div className="username">{user.username} &nbsp;
              <Badge imageUrl={user.customDTO?.badgeDTO?.imageUrl} />
            </div>
          </div>

          <button  onClick={() => approve(user.userId)}>수락</button>
          <button onClick={() => reject(user.userId)}>거절</button>
        </div>
      ))}
    </div>
  );
}

export default PendingList;
