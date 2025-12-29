import styled from "styled-components";
import { Input } from "antd";

export const Replies = styled(Input)`
  width: 70%;
  background: #130016;
  border: none;

  &::placeholder {
    color: #e6c0c7; /* 혹은 원하는 색상 */
    opacity: 0.7; /* 너무 쨍하면 투명도 조절 */
    font-size: 15px;
  }
  &:focus {
    background: #130016;
    color: #e6c0c7;
  }
`;
