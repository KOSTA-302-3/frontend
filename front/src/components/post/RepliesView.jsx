import React, { useEffect, useState } from "react";
import InputReplies from "./InputReplies";
import { ModalWrapper } from "./RepliesView.style";
import { Button } from "antd";
import RepliesCard from "./RepliesCard";
import axios from "axios";

const RepliesView = ({ open, onClose, postId }) => {
  let [replies, setReplies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const fetchPosts = async (pageNo) => {
    try {
      const response = await axios.get(
        "http://localhost:9000/replies/getReplies",
        {
          params: {
            pageNo: pageNo,
            id: postId,
          },

          withCredentials: true,
        }
      );

      console.log("데이터 수신:", response.data);
      setReplies((prev) => [...prev, ...response.data.content]);
    } catch (e) {
      console.error("에러 발생:", e);
    }
  };
  useEffect(() => {
    fetchPosts(pageNo);
  }, [pageNo]);

  return (
    <ModalWrapper open={open} onOk={onClose} onCancel={onClose} footer={null}>
      <InputReplies />
      <Button>전송</Button>
      {replies.map((item, key) => (
        <RepliesCard
          key={key}
          profileImage={"aa"}
          username={item.userId}
          caption={item.replyContent}
          likes={item.replyLike}
        />
      ))}
    </ModalWrapper>
  );
};

export default RepliesView;
