import styled from "styled-components";
import { Form, Typography, Button, Input } from "antd";

// 테마 색상 변수 정의 (유지보수를 위해)
const PRIMARY_COLOR = "#e6c0c7";
const HOVER_COLOR = "#d4a5ad"; // 약간 더 진한 색 (호버용)

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: black;
`;

export const StyledForm = styled(Form)`
  max-width: 80%;
  width: 100%;
  padding: 20px;

  @media (min-width: 768px) {
    max-width: 400px;
  }

  // 1. 체크박스 색상 커스텀 (ConfigProvider 대체)
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${PRIMARY_COLOR};
    border-color: ${PRIMARY_COLOR};
  }

  // 체크박스 호버 시 테두리 색상
  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${PRIMARY_COLOR};
  }

  // 2. 링크(a 태그) 색상 커스텀
  a {
    color: ${PRIMARY_COLOR};
    &:hover {
      color: ${HOVER_COLOR};
    }
  }

  // 회원가입 링크 위치 정렬용 클래스
  .signup-link {
    margin-top: 10px;
    text-align: center;
  }
`;

export const StyledTitle = styled(Typography.Title)`
  && {
    text-align: center;
    margin-bottom: 30px;
    color: ${PRIMARY_COLOR}; // 타이틀 색상 적용
  }
`;

export const StyledButton = styled(Button)`
  && {
    height: 45px;
    font-size: 16px;
    font-weight: bold;

    // 버튼 배경색 및 테두리 (ConfigProvider 대체)
    background-color: ${PRIMARY_COLOR};
    border-color: ${PRIMARY_COLOR};

    // 호버/클릭 효과
    &:hover,
    &:focus {
      background-color: ${HOVER_COLOR} !important;
      border-color: ${HOVER_COLOR} !important;
      color: white !important;
    }
  }
`;

export const StyledInput = styled(Input)`
  && {
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 6px;
    color: ${PRIMARY_COLOR};

    // 인풋 포커스 시 색상 (파란색 -> 핑크색 변경)
    &:hover,
    &:focus,
    &.ant-input-focused {
      border-color: ${PRIMARY_COLOR};
      box-shadow: 0 0 0 2px rgba(230, 192, 199, 0.2); // 핑크색 그림자
    }

    // 내부 아이콘 색상
    .anticon {
      color: ${PRIMARY_COLOR};
    }
  }
`;
