import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useState } from "react";
import "./ActionButton.css";

const LikeButton = ({ isLiked: initialLiked = false, onClick }) => {
  const [isLiked, setIsLiked] = useState(initialLiked);

  const handleClick = () => {
    setIsLiked(!isLiked);
    if (onClick) onClick(!isLiked);
  };

  return (
    <div className="action-button" onClick={handleClick}>
      {isLiked ? <HeartFilled /> : <HeartOutlined />}
    </div>
  );
};

export default LikeButton;
