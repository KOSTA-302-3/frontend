import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Flex,
  Form,
  Input,
  ConfigProvider,
  Typography,
} from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const LoginLabel = styled.div``;

const LoginForm = () => {
  const { Title } = Typography;
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
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#e6c0c7",
          colorText: "#e6c0c7",
          colorLink: "#e6c0c7",
        },
        components: {
          Button: {
            colorPrimary: "#e6c0c7",
            algorithm: true,
          },
          Input: {
            colorBgContainer: "#f0f0f0",
          },

          Form: {
            labelColor: "rgba(255, 255, 255, 0.85)",
          },
        },
      }}
    >
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: 30 }}>
          LOGIN
        </Title>

        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>아이디 기억하기</Checkbox>
            </Form.Item>
            <a>
              <label>비밀번호 찾기</label>
            </a>
          </Flex>
        </Form.Item>
        <Form.Item>
          <Button block type="primary" onClick={clickEvent}>
            Log in
          </Button>
          <a>화원가입</a>
        </Form.Item>
      </Form>
    </ConfigProvider>
  );
};
export default LoginForm;
