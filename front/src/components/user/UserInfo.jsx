import React, { useEffect, useState } from "react";
import ProfileImage from "../common/ProfileImage";
import AppButton from "../common/AppButton";
import Badge from "../common/Badge";
import UserStat from "./UserStat";
import "./UserInfo.css";
import ProfileButton from "./ProfileButton";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

function UserInfo({ user, postCount }) {
  const nav = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(user.followerCount);

  useEffect(() => {
    if (user.isMe) return;
    if (!user.userId) return;

    axiosInstance({
      url: `/api/follow/${user.userId}`,
      method: "GET",
    })
      .then((res) => {
        //console.log("result: ", res);
        setIsFollowing(res.data);
        setFollowerCount(user.followerCount);
      })
      .catch(() => {
        alert("팔로우 조회 실패");
      });
  }, [user.userId]);

  const follow = () => {
    axiosInstance({
      url: "/api/follow",
      method: "POST",
      data: {
        followingId: user.userId,
      },
    })
      .then((res) => {
        //console.log("result: ", res);
        setIsFollowing(true);
        setFollowerCount((cnt) => cnt + 1);
      })
      .catch(() => {
        alert("팔로우 실패");
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

  const makeChatroom = () => {
    axiosInstance({
      url: `/api/chatroom/${user.userId}`,
      method: "POST",
    })
      .then((res) => {
        //console.log("result: ", res);
        nav(`/chat/${res.data}`);
      })
      .catch(() => {
        alert("메시지를 보낼 수 없습니다.");
      });
  };

  return (
    <div className="profile">
      <div className="profile-row">
        {/* 프로필 이미지 */}
        <div className="profile-left">
          <ProfileImage src={user.profileImage} />
        </div>
        {/* 프로필 정보 */}
        <div className="profile-right">
          <h2>
            {user.username}
            <Badge imageUrl={user.customDTO?.badgeDTO?.imageUrl} />
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
            <ProfileButton btnType="default" onClick={() => nav("/settings/profile")}>
              프로필 편집
            </ProfileButton>
            <ProfileButton btnType="default">프로필 공유</ProfileButton>
          </>
        ) : (
          <>
            {isFollowing ? (
              <ProfileButton btnType="point" onClick={unfollow}>
                팔로우 중
              </ProfileButton>
            ) : (
              <ProfileButton btnType="point" onClick={follow}>
                팔로우
              </ProfileButton>
            )}
            <ProfileButton btnType="default" onClick={makeChatroom}>
              메시지 보내기
            </ProfileButton>
          </>
        )}
      </div>
    </div>
  );
}

export default UserInfo;
