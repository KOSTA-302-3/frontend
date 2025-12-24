import React, { useContext, useState } from "react";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Col, Form, Row } from "antd";
import { useNavigate } from "react-router-dom";
import {
  StyledButton,
  StyledInput,
} from "../../components/common/LoginForm.style";
import { SignUpContext } from "./SignUpPage";
import { ButtonRow, SignUpForm, SubTitle, Title } from "./SignUp.styles";
import axiosInstance from "../../api/axiosInstance";

function SignUpDefault() {
  const nav = useNavigate();
  const { newUser, setNewUser } = useContext(SignUpContext);

  // username 중복 확인 통과 여부를 위함
  const [usernameChecked, setUsernameChecked] = useState(false);
  const [usernameHelp, setUsernameHelp] = useState("");

  const onFinish = (values) => {
    if (usernameChecked === false) {
      alert("아이디 중복 확인을 해주세요.");
      return;
    }
    setNewUser({ ...newUser, ...values });
    nav("/signup/profile");
  };

  const checkUsername = () => {
    if (newUser.username === "") {
      alert("아이디를 먼저 입력해주세요.");
      return;
    }

    axiosInstance({
      url: `/api/user/username/${newUser.username}`,
      method: "get",
    })
      .then((res) => {
        console.log("result: ", res);
        if (res.data === "OK") {
          setUsernameChecked(true);
          setUsernameHelp("사용 가능한 아이디입니다");
        } else {
          setUsernameChecked(false);
          setUsernameHelp("이미 사용 중인 아이디입니다");
        }
      })
      .catch(() => {
        setUsernameChecked(false);
        setUsernameHelp("아이디 중복 확인에 실패했습니다");
      });
  };

  return (
    <>
      <SubTitle>기본 정보</SubTitle>

      <SignUpForm
        layout="vertical"
        onFinish={onFinish}
        initialValues={newUser}
        onValuesChange={(changed) => {
          setNewUser({ ...newUser, ...changed });
          if (changed.username) {
            setUsernameChecked(false);
            setUsernameHelp("");
          }
        }}
      >
        <Form.Item
          name="username"
          validateStatus={usernameHelp ? (usernameChecked ? "success" : "error") : undefined}
          help={usernameHelp ? usernameHelp : undefined}
          rules={[
            { required: true, message: "아이디를 입력해주세요" },
            { min: 4, message: "아이디는 최소 4자 이상입니다" },
          ]}
        >
          <Row gutter={8}>
            <Col flex="auto">
              <StyledInput prefix={<UserOutlined />} placeholder="Username" />
            </Col>
            <Col>
              <StyledButton type="primary" onClick={checkUsername}>
                중복 확인
              </StyledButton>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "비밀번호를 입력해주세요" },
            { min: 6, message: "비밀번호는 최소 6자 이상입니다" },
          ]}
        >
          <StyledInput
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: "이메일을 입력해주세요" },
            { type: "email", message: "올바른 이메일 형식이 아닙니다" },
          ]}
        >
          <StyledInput prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            { required: true, message: "전화번호를 입력해주세요" },
            {
              pattern: /^[0-9]{10,11}$/,
              message: "숫자만 10~11자리로 입력해주세요",
            },
          ]}
        >
          <StyledInput prefix={<PhoneOutlined />} placeholder="Phone" />
        </Form.Item>

        <ButtonRow>
          <StyledButton block type="primary" htmlType="submit">
            다음
          </StyledButton>
        </ButtonRow>
      </SignUpForm>
    </>
  );
}

export default SignUpDefault;
