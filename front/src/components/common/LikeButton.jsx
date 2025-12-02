import styled from "styled-components";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useState } from "react";

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

const LikeButton = ({ isLiked: initialLiked = false, onClick }) => {
  const [isLiked, setIsLiked] = useState(initialLiked);

  const handleClick = () => {
    setIsLiked(!isLiked);
    if (onClick) onClick(!isLiked);
  };

  return (
    <Button onClick={handleClick}>
      {isLiked ? <HeartFilled /> : <HeartOutlined />}
    </Button>
  );
};

export default LikeButton;
