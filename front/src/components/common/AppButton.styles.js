import styled from "styled-components";
import { Button } from "antd";

export const StyledButton = styled(Button)`
  width: 100%;
  height: 100%;
  border-radius: 4vh;
  font-size: 2.5vh;
  border: 0.2vh solid #e6c0c7;
  background: none;
  color: #e6c0c7;

  &:hover {
    border-color: #ffdaec;
    color: #ffdaec;
    background: none;
  }

  &:focus {
    border-color: #e6c0c7;
    color: #e6c0c7;
    background: none;
  }
`;
