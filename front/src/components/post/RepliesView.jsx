import React, { useEffect, useState, useCallback, useRef } from "react";
import InputReplies from "./InputReplies";
import { ModalWrapper } from "./RepliesView.style";
import { Button } from "antd";
import RepliesCard from "./RepliesCard";
import axiosInstance from "../../api/axiosInstance";

const RepliesView = ({ open, onClose, postId, profileImage }) => {
  const [replies, setReplies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [replyValue, setReplyValue] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const scrollRef = useRef(null);

  const fetchReplies = useCallback(
    async (currentPage, isReset = false) => {
      if (isLoading) return;

      setIsLoading(true);

      try {
        const response = await axiosInstance.get("/api/replies/getReplies", {
          params: {
            pageNo: currentPage,
            id: postId,
          },
          withCredentials: true,
        });

        console.log(`페이지: ${currentPage}, 데이터 수신:`, response.data);
        const newContent = response.data.content;

        if (newContent.length === 0) {
          setHasMore(false);
        }

        if (isReset) {
          setReplies(newContent);
        } else {
          setReplies((prev) => [...prev, ...newContent]);
        }
      } catch (e) {
        console.error("에러 발생:", e);
      } finally {
        setIsLoading(false);
      }
    },
    [postId, isLoading]
  );

  useEffect(() => {
    if (open && postId) {
      setPageNo(1);
      setHasMore(true);
      setReplies([]);
      setIsLoading(false);
    }
  }, [open, postId]);

  useEffect(() => {
    if (open && postId) {
      const isReset = pageNo === 1;
      fetchReplies(pageNo, isReset);
    }
  }, [pageNo, open, postId]);

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;

    if (scrollHeight - scrollTop <= clientHeight + 50) {
      if (!isLoading && hasMore) {
        setPageNo((prev) => prev + 1);
      }
    }
  };

  const onClick = async () => {
    if (!replyValue.trim()) return;

    try {
      const response = await axiosInstance.post(
        "/api/replies/createReplies",
        {
          postId: postId,
          replyContent: replyValue,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setReplies((prev) => [...prev, response.data]);
      setReplyValue("");

      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    } catch (e) {
      console.error("에러 발생:", e);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setReplyValue(val);
  };

  return (
    <ModalWrapper open={open} onOk={onClose} onCancel={onClose} footer={null}>
      <InputReplies value={replyValue} onChange={handleChange} />
      <Button
        onClick={onClick}
        style={{
          marginBottom: "10px",
          marginLeft: "5px",
          background: "black",
          color: " #e6c0c7",
          border: "1px solid  #e6c0c7",
        }}
      >
        전송
      </Button>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          height: "400px",
          overflowY: "auto",
          paddingRight: "5px",
          overscrollBehavior: "contain",
        }}
      >
        {replies.map((item, key) => (
          <RepliesCard
            key={`${item.replyId || key}`}
            profileImage={profileImage}
            username={item.createUserName}
            caption={item.replyContent}
            likes={item.replyLike}
            userId={item.createUserId}
          />
        ))}
        {isLoading && <div style={{ textAlign: "center" }}>Loading...</div>}
      </div>
    </ModalWrapper>
  );
};

export default RepliesView;
