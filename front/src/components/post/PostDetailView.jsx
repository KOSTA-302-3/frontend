import React, { useEffect, useState } from "react";
import { ModalWrapper } from "./PostDetailView.style";
import axiosInstance from "../../api/axiosInstance";
import PostCard from "./PostCard";

const PostDetailView = ({ open, onClose, postId }) => {
  const [post, setPost] = useState(null);

  const fetchPost = async () => {
    if (!postId) return;

    try {
      const response = await axiosInstance.get("/posts/getPostsByPostId", {
        params: { PostId: postId },
        withCredentials: true,
      });

      console.log("받아온 데이터:", response.data);

      setPost(response.data);
    } catch (e) {
      console.error("에러 발생:", e);
    }
  };

  useEffect(() => {
    if (open) {
      setPost(null);
      fetchPost();
    }
  }, [open, postId]);

  return (
    <ModalWrapper open={open} onOk={onClose} onCancel={onClose} footer={null}>
      {post ? (
        <PostCard
          key={post.postId}
          username={post.createUserName || "이름 없음"}
          profileImage={
            post.userProfileImage || "https://placeholder.com/user.png"
          }
          postImage={
            post.imageSourcesList || "https://placeholder.com/post.png"
          }
          caption={post.content || "내용 없음"}
          likes={post.likeCount || 0}
          isLiked={post.isLiked || false}
          onComment={() => console.log("댓글 클릭")}
          onShare={() => console.log("공유 클릭")}
          postId={post.postId}
          userCheck={post.userCheck}
          visible={post.contentVisible}
        />
      ) : (
        <div style={{ padding: "20px", textAlign: "center" }}>
          데이터를 불러오는 중입니다...
        </div>
      )}
    </ModalWrapper>
  );
};

export default PostDetailView;
