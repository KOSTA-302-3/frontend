import styled from "styled-components";
import { CommentOutlined } from "@ant-design/icons";

const Button = styled.div`
  font-size: clamp(20px, 3vh, 28px);
  color: #e6c0c7;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const CommentButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <CommentOutlined />
    </Button>
  );
};

export default CommentButton;
