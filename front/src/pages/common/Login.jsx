import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import PostView from "../post/PostView";
import { NavItem } from "../../components/common/BottomNav.styles";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3vh;
  padding: 3vh 3vw;
`;

const Login = () => {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const clickEvent = () => {
    axios
      .post("http://localhost:9000/login", null, {
        params: {
          username: username,
          password: password,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log("로그인 성공:", response);
        navigate("/dd");
      })
      .catch(() => {
        alert("오류입니다!");
      });
  };

  return (
    <Container>
      {" "}
      <h3>로그인</h3>
      <input
        type="text"
        placeholder="아이디"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        type="text"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={clickEvent}>로그인</button>
    </Container>
  );
};

export default Login;
