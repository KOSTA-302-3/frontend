import { Modal } from "antd";
import InputReplies from "./InputReplies";

const PostDetail = ({ open, onClose }) => {
  return (
    <Modal
      title="상세 보기"
      closable={{ "aria-label": "Custom Close Button" }}
      open={open}
      onOk={onClose}
      onCancel={onClose}
    >
      <p>제목</p>
      <p>사진</p>
      <p>내용</p>
      <InputReplies />
    </Modal>
  );
};

export default PostDetail;
