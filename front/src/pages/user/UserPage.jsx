import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import UserInfo from "../../components/user/UserInfo";
import UserPostGrid from "../../components/user/UserPostGrid";
import UserHeader from "../../components/user/UserHeader";

function UserPage() {
  const { id } = useParams(); // /user/:id
  const nav = useNavigate();

  const [user, setUser] = useState({
    userId: "",
    username: "",
    profileImage: "",
    description: "",
    followingCount: "",
    followerCount: "",
    customeDTO: {
        badgeDTO: {},
        colorDTO: {},
    },
  });

  useEffect(() => {
    axiosInstance({
        url: `/api/user/${id}`,
        method: "get",
    })
    .then((result) => {
        setUser(result.data);
        console.log("user: ", user);
    })
    .catch((err) => {
        console.log(err);

        if (err.response?.status === 403) {
            alert("로그인 후 이용해주세요.");
            nav("/login");
        } else {
            alert("유저 정보를 불러오지 못했습니다.");
        }
    });
  }, []);

  return (
    <>
      <UserHeader user={user} />
      <UserInfo user={user} />
      <UserPostGrid userId={user.userId}/>
    </>
  )
  ;
}

export default UserPage;
