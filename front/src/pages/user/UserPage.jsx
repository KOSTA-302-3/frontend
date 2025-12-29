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
  }, [id, loginUser]);

  const targetUser = id ? user : loginUser;
  if (!targetUser) return null;

  return (
    <>
      <UserHeader user={targetUser} />
      <UserInfo user={targetUser} />
      <UserPostGrid userId={targetUser.userId} />
    </>
  );
}

export default UserPage;
