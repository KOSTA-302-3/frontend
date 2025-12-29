import React, { useEffect, useState } from "react";
import ProfileImage from "../common/ProfileImage";
import AppButton from "../common/AppButton";
import Badge from "../common/Badge";
import UserStat from "./UserStat";
import "./UserInfo.css";
import ProfileButton from "./ProfileButton";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { Dropdown } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import ReportModal from "../common/ReportModal";

function UserInfo({ user, postCount, isBlocked, setIsBlocked, isFollowing, setIsFollowing }) {
  const nav = useNavigate();
  const [followerCount, setFollowerCount] = useState(user.followerCount);
  const [reportOpen, setReportOpen] = useState(false);

  useEffect(() => {
    setFollowerCount(user.followerCount);
  }, [user]);

  const follow = () => {
    axiosInstance({
      url: "/api/follow",
      method: "POST",
      data: {
        followingId: user.userId,
      },
    })
      .then((res) => {
        console.log("result: ", res);
        setIsFollowing(res.data);
        setFollowerCount((cnt) => cnt + 1);
      })
      .catch(() => {
        alert("이미 팔로우 요청을 보냈습니다.");
      });
  };

  const unfollow = () => {
    if (!confirm("팔로우를 취소하시겠습니까?")) return;

    axiosInstance({
      url: `/api/follow/${user.userId}`,
      method: "DELETE",
    })
      .then((res) => {
        //console.log("result: ", res);
        setIsFollowing(false);
        setFollowerCount((cnt) => cnt - 1);
      })
      .catch(() => {
        alert("팔로우 취소 실패");
      });
  };

  const block = () => {
    if (!confirm("이 사용자를 차단하시겠습니까?")) return;

    axiosInstance({
      url: "/api/block",
      method: "POST",
      data: {
        blockType: "USER",
        targetId: user.userId,
      },
    })
      .then(() => {
        alert("유저를 차단했습니다.");
        setIsBlocked(true);
      })
      .catch(() => {
        alert("차단 실패");
      });
  }

  const unblock = () => {
    if (!confirm("차단 해제하시겠습니까?")) return;

    axiosInstance({
      url: `/api/block/USER/${user.userId}`,
      method: "DELETE",
    })
      .then(() => {
        alert("차단 해제했습니다.");
        setIsBlocked(false);
      })
      .catch(() => {
        alert("차단 해제 실패");
      });
  }

  const reportUser = () => {
    setReportOpen(true);
  }

  const makeChatroom = () => {
    axiosInstance({
      url: `/api/chatroom/${user.userId}`,
      method: "POST",
    })
      .then((res) => {
        //console.log("result: ", res);
        nav(`/chat/${res.chatroomId}`);
      })
      .catch(() => {
        alert("메시지를 보낼 수 없습니다.");
      });
  };

  const moreMenu = {
    items: [
      isBlocked ? 
      {
        key: "unblock",
        label: "차단해제",
        onClick: unblock,
      } : 
      {
        key: "block",
        label: "차단하기",
        onClick: block,
        danger: true,
      },
      {
        key: "report",
        label: "신고하기",
        onClick: reportUser,
        danger: true,
      },
    ]
  }

  return (
    <div className="profile">
      <div className="profile-row">
        {/* 프로필 이미지 */}
        <div className="profile-left">
          <ProfileImage src={user.profileImage} />
        </div>
        {/* 프로필 정보 */}
        <div className="profile-right">
          <h2 className="username-row">
            <span className="username">
              {user.username} &nbsp;
              <Badge imageUrl={user.customDTO?.badgeDTO?.imageUrl} />
            </span>

            {!user.isMe && (
              <Dropdown menu={moreMenu} trigger={["click"]}>
                <EllipsisOutlined className="more-btn" />
              </Dropdown>
            )}
          </h2>
          <div className="stats">
            <UserStat label="게시물" value={postCount} />
            <UserStat
              label="팔로워"
              value={followerCount || 0}
              onClick={() => nav(`/user/${user.userId}/follow?tab=followers`)}
            />
            <UserStat
              label="팔로잉"
              value={user.followingCount}
              onClick={() => nav(`/user/${user.userId}/follow?tab=followings`)}
            />
          </div>
        </div>
      </div>
      {/* 프로필 소개 */}
      <div className="description">{user.description}</div>
      {/* 상호작용 버튼 */}
      <div className={`actions ${user.isMe ? "me" : "other"}`}>
        {user.isMe ? (
          <>
            <ProfileButton
              btnType="default"
              onClick={() => nav("/settings/profile")}
            >
              프로필 편집
            </ProfileButton>
            <ProfileButton btnType="default">프로필 공유</ProfileButton>
          </>
        ) : (
          <>
            {isFollowing ? 
              <ProfileButton btnType="default" onClick={unfollow}>팔로우 중</ProfileButton>
              :
              <ProfileButton btnType="point" onClick={follow}>팔로우</ProfileButton>
            }
            <ProfileButton btnType="default" onClick={makeChatroom}>메시지 보내기</ProfileButton>
          </>
        )}
      </div>
      
      <ReportModal open={reportOpen} onClose={() => setReportOpen(false)} reportType="USER" targetId={user.userId} onSuccess={() => alert("신고 완료")} />
    </div>
  );
}

export default UserInfo;
