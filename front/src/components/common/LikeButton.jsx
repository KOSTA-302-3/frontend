import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useState } from "react";
import { Button } from "./ActionButton.styles";

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
