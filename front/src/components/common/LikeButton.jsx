import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Button } from "./ActionButton.styles";

const LikeButton = ({ ckLiked, onClick }) => {
  return (
    <Button onClick={onClick}>
      {ckLiked ? <HeartFilled /> : <HeartOutlined />}
    </Button>
  );
};

export default LikeButton;
