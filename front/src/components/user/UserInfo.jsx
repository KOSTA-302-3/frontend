import React from "react";
import ProfileImage from "../common/ProfileImage";
import AppButton from "../common/AppButton";
import Badge from "../common/Badge";
import UserStat from "./UserStat";
import "./UserInfo.css";
import ProfileButton from "./ProfileButton";

function UserInfo({ user }) {
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
            <UserStat label="팔로워" value={user.followerCount} />
            <UserStat label="팔로잉" value={user.followingCount} />
          </div>
        </div>
      </div>
      {/* 프로필 소개 */}
      <div className="description">
        {user.description}
      </div>
      {/* 상호작용 버튼 */}
      <div className={`actions ${user.isMe ? "me" : "other"}`}>
        {user.isMe ? 
          <>
            <ProfileButton btnType="default">프로필 편집</ProfileButton>
            <ProfileButton btnType="default">프로필 공유</ProfileButton>
          </>
          : 
          <>
            <ProfileButton btnType="point">팔로우</ProfileButton>
            <ProfileButton btnType="default">메시지 보내기</ProfileButton>
          </>
        }
      </div>
    </div>
  );
}

export default UserInfo;
