import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUpContext } from './SignUpPage';
import axiosInstance from '../../api/axiosInstance';
import { SubTitle, Title } from './SignUp.styles';
import { Slider } from 'antd';
import { StyledButton } from '../../components/common/LoginForm.style';

function SignUpLevel() {
  const nav = useNavigate();
  const { newUser, setNewUser } = useContext(SignUpContext);

  const submitSignup = () => {
    axiosInstance({
      url: "/api/user",
      method: "POST",
      data: newUser,
    })
      .then(() => {
        alert("회원가입이 완료되었습니다!");
        nav("/login");
      })
      .catch(() => {
        alert("회원가입 중 오류가 발생했습니다.");
      });
  };

  return (
    <>
      <SubTitle>레벨 설정하기</SubTitle>

      <Slider
        min={1}
        max={10}
        value={newUser.level}
        onChange={(v) => setNewUser({ ...newUser, level: v })}
      />

      <StyledButton block type="primary" onClick={submitSignup}>
        가입 완료
      </StyledButton>
    </>
  );
}

export default SignUpLevel;