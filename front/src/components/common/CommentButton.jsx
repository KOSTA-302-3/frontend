import { CommentOutlined } from "@ant-design/icons";
import { Button } from "./ActionButton.styles";

const CommentButton = ({ onClick }) => {
  return (
    <Button onClick={onClick}>
      <CommentOutlined />
    </Button>
  );
};

export default CommentButton;
