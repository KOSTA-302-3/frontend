import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import UserInfo from "../../components/user/UserInfo";
import UserPostGrid from "../../components/user/UserPostGrid";
import UserHeader from "../../components/user/UserHeader";
import { useSelector } from "react-redux";

function UserPage() {
  const { id } = useParams(); // /user/:id
  const nav = useNavigate();
  const loginUser = useSelector((state) => state.auth.user);
  const [postCount, setPostCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const [user, setUser] = useState({
    userId: "",
    username: "",
    profileImage: "",
    description: "",
    followingCount: "",
    followerCount: "",
    customDTO: {
      badgeDTO: {},
      colorDTO: {},
    },
  });

  useEffect(() => {
    if (!id) return;

    axiosInstance({
        url: `/api/user/${id}`,
        method: "get",
    })
      .then((result) => {
        setUser(result.data);
        //console.log("user: ", user);
    })
      .catch((err) => {
        //console.log(err);
        if (err.response?.status === 401 || err.response?.status === 403) {
            alert("로그인 후 이용해주세요.");
            nav("/login");
        } else {
          alert("유저 정보를 불러오지 못했습니다.");
        }
      });

    axiosInstance({
      url: `/api/block/USER/${id}`,
      method: "GET",
    })
      .then((res) => {
        setIsBlocked(res.data);
      })
      .catch(() => {
        console.error("차단 상태 조회 실패");
      });
    
    axiosInstance({
      url: `/api/follow/${id}`,
      method: "GET",
    })
      .then((res) => {
        //console.log("result: ", res);
        setIsFollowing(res.data);
      })
      .catch(() => {
        alert("팔로우 조회 실패");
      });
  }, [id, loginUser]);

  const targetUser = id ? user : loginUser;
  if (!targetUser) return null;

  return (
    <>
      <UserHeader user={targetUser} />
      <UserInfo user={targetUser} postCount={postCount} 
        isBlocked={isBlocked} setIsBlocked={setIsBlocked}
        isFollowing={isFollowing} setIsFollowing={setIsFollowing} />
      <UserPostGrid user={targetUser} onPostCountChange={setPostCount} 
        isBlocked={isBlocked} isFollowing={isFollowing} />
    </>
  );
}

export default UserPage;
