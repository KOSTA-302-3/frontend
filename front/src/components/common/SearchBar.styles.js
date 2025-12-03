import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5vw;
  padding: 1.5vh 3vw;
  border-radius: 50vh;
  background: rgba(0, 0, 0, 0.35);
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

export const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  color: #f3c7d1;
  outline: none;
  font-size: 2vh;

  &::placeholder {
    color: #a67aa0;
  }
`;

export const StyledIcon = styled(SearchOutlined)`
  font-size: 2.5vh;
  color: #f3c7d1;
`;
