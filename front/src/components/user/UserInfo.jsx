import React from "react";
import ProfileImage from "../common/ProfileImage";
import AppButton from "../common/AppButton";
import Badge from "../common/Badge";
import UserStat from "./UserStat";
import "./UserInfo.css";
import ProfileButton from "./ProfileButton";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

function UserInfo({ user }) {
  const nav = useNavigate();

  const follow = (followingId) => {
    axiosInstance({
      url: "/api/follow",
      method: "POST",
      data: {
        followingId
      },
    })
      .then((res) => {
        console.log("result: ", res);
      })
      .catch(() => {
        alert("팔로우 실패!");
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
            <UserStat label="게시물" value={0} />
            <UserStat
              label="팔로워"
              value={user.followerCount}
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
            <ProfileButton btnType="point" onClick={() => follow(user.userId)}>팔로우</ProfileButton>
            <ProfileButton btnType="default" onClick={() => alert("DM 연결")}>메시지 보내기</ProfileButton>
          </>
        )}
      </div>
    </div>
  );
}

export default UserInfo;
