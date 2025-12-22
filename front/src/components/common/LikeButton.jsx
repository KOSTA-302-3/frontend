import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Button } from "./ActionButton.styles";

const LikeButton = ({ ckLiked, onClick }) => {
  console.log(ckLiked);

  return (
    <Button onClick={onClick}>
      {ckLiked ? <HeartFilled /> : <HeartOutlined />}
    </Button>
  );
};

export default LikeButton;
