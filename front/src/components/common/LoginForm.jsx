import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Checkbox, Flex, Form } from "antd"; // ConfigProvider 제거됨
import { useNavigate } from "react-router-dom";

// 스타일 파일 import
import { LoginContainer, StyledForm, StyledTitle, StyledButton, StyledInput } from "./LoginForm.style";
import axiosInstance from "../../api/axiosInstance";

const LoginForm = () => {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const clickEvent = () => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    axiosInstance
      .post("/api/login", formData, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.role === "ADMIN") navigate("/admin");
        else navigate("/");
      })
      .catch(() => {
        alert("일치하는 회원 정보가 없습니다.");
      });
  };

  return (
    <LoginContainer>
      <StyledForm name="login" initialValues={{ remember: true }}>
        <StyledTitle level={1}>LOGIN</StyledTitle>

        <Form.Item name="username" rules={[{ required: true, message: "아이디를 입력하세요" }]}>
          <StyledInput
            prefix={<UserOutlined />}
            placeholder="Username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: "패스워드를 입력하세요" }]}>
          <StyledInput
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        {/* <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>아이디 기억하기</Checkbox>
            </Form.Item>
            <a>
              <label>비밀번호 찾기</label>
            </a>
          </Flex>
        </Form.Item> */}

        <Form.Item>
          <StyledButton block type="primary" onClick={clickEvent}>
            Log in
          </StyledButton>
          <div className="signup-link">
            <a onClick={() => navigate("/signup")}>회원가입</a>
          </div>
        </Form.Item>
      </StyledForm>
    </LoginContainer>
  );
};

export default LoginForm;
