import styled from "styled-components";
import { LeftOutlined } from "@ant-design/icons";

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 12vh;
  background: #1a001f;
  display: flex;
  align-items: center;
  padding-inline: 6vw;
  box-sizing: border-box;
  z-index: 100;
`;

export const BackIcon = styled(LeftOutlined)`
  font-size: 4vh;
  font-weight: bold;
  color: #e6c0c7;
  margin: 0;
  cursor: pointer;
`;

export const Title = styled.h1`
  font-size: 4vh;
  font-weight: bold;
  color: #e6c0c7;
  margin: 0;
  flex: 1;
  text-align: left;
`;

export const IconGroup = styled.div`
  display: flex;
  gap: 3vw;
  align-items: center;
`;

export const HeaderIcon = styled.div`
  font-size: 3.5vh;
  color: #e6c0c7;
  cursor: pointer;

  &:hover {
    color: #ffdaec;
  }
`;
