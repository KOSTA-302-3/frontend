import { Form } from "antd";
import styled from "styled-components";

export const LayoutWrapper = styled.div`
  min-height: 100vh;
  background: #130016;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  max-width: 80%;
  width: 100%;
  background: #1a001f;
  border-radius: 1.2vw;
  padding: 2.8vw;
  color: #fff;
`;

export const Title = styled.h1`
  color: #e6c0c7;
  text-align: center;
  margin-bottom: 3vw;
  font-weight: 700;
`;

export const SubTitle = styled.h3`
  color: #e9e9e9;
  text-align: center;
  margin-bottom: 3vw;
  font-weight: 300;
`;

export const SignUpForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 0;

  /* Form.Item 성공 메시지 */
  .ant-form-item-explain-success {
    color: #fff;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;
