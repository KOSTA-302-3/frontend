import React, { useState } from "react";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Form } from "antd";
import { useNavigate } from "react-router-dom";

import {
  LoginContainer,
  StyledForm,
  StyledTitle,
  StyledButton,
  StyledInput,
} from "../../components/common/LoginForm.style";

import axiosInstance from "../../api/axiosInstance";

function SignUp() {
  const nav = useNavigate();

  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
  });

  const onChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
    console.log("newUser: ", newUser);
  };

  const submitSignup = () => {
    axiosInstance({
      url: "/api/user",
      method: "POST",
      data: {
        ...newUser,
        level: 10,
      },
    })
      .then((result) => {
        alert("회원가입이 완료되었습니다!");
        nav("/login");
      })
      .catch(() => {
        alert("회원가입 중 오류가 발생했습니다.");
      });
  };

  return (
    <LoginContainer>
      <StyledForm>
        <StyledTitle level={1}>SIGN UP</StyledTitle>

        <Form.Item rules={[{ required: true, message: "아이디를 입력하세요" }]}>
          <StyledInput
            prefix={<UserOutlined />}
            placeholder="Username"
            name="username"
            value={newUser.username}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item
          rules={[{ required: true, message: "비밀번호를 입력하세요" }]}
        >
          <StyledInput
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
            name="password"
            value={newUser.password}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item
          rules={[
            { required: true, message: "이메일을 입력하세요" },
            { type: "email", message: "올바른 이메일 형식이 아닙니다" },
          ]}
        >
          <StyledInput
            prefix={<MailOutlined />}
            placeholder="Email"
            name="email"
            value={newUser.email}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item
          rules={[{ required: true, message: "전화번호를 입력하세요" }]}
        >
          <StyledInput
            prefix={<PhoneOutlined />}
            placeholder="Phone"
            name="phone"
            value={newUser.phone}
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item>
          <StyledButton block type="primary" onClick={submitSignup}>
            Sign up
          </StyledButton>

          <div className="signup-link">
            이미 계정이 있으신가요? <a onClick={() => nav("/login")}>로그인</a>
          </div>
        </Form.Item>
      </StyledForm>
    </LoginContainer>
  );
}

export default SignUp;
