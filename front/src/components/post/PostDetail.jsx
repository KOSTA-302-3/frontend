import React from "react";
import InputReplies from "./InputReplies";
import { ModalWrapper } from "./PostDetail.style";
import { Button } from "antd";
import RepliesCard from "./RepliesCard";

const PostDetail = ({ open, onClose }) => {
  return (
    <ModalWrapper
      open={open}
      onOk={onClose}
      onCancel={onClose}
      footer={null}
      // width="100%"
      // style={{
      //   top: "auto",
      //   bottom: 0,
      //   position: "absolute",
      //   margin: 0,
      //   padding: 0,
      //   maxWidth: "100%",
      //   maxHeight: "50vh",
      //   overflowY: "auto",
      // }}
    >
      <InputReplies />
      <Button>전송</Button>
      <RepliesCard profileImage={"aa"} username={11} caption={"ss"} likes={3} />
      <RepliesCard profileImage={"aa"} username={11} caption={"ss"} likes={3} />
      <RepliesCard profileImage={"aa"} username={11} caption={"ss"} likes={3} />

      <RepliesCard profileImage={"aa"} username={11} caption={"ss"} likes={3} />
      <RepliesCard profileImage={"aa"} username={11} caption={"ss"} likes={3} />
      <RepliesCard profileImage={"aa"} username={11} caption={"ss"} likes={3} />
    </ModalWrapper>
  );
};

export default PostDetail;
