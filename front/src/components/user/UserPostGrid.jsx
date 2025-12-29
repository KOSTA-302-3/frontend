import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "./UserPostGrid.css";
import { useNavigate } from "react-router-dom";
import PostDetailView from "../post/PostDetailView";

function UserPostGrid({ user, onPostCountChange, isBlocked, isFollowing }) {
  const [posts, setPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [postId, setPostId] = useState(0);
  const nav = useNavigate();

  useEffect(() => {
    if (!user.userId) return;

    axiosInstance({
      url: `/api/posts/getPostsByUserId`,
      method: "get",
      params: {
        userId: user.userId,
        pageNo: 1,
      },
    })
      .then((result) => {
        //console.log("posts", result.data);
        setPosts(result.data.content);
        onPostCountChange?.(result.data.totalElements);
      })
      .catch((err) => {
        //console.log(err);

        if (err.response?.status === 401 || err.response?.status === 403) {
            alert("로그인 후 이용해주세요.");
            nav("/login");
        } else {
          alert("게시물을 불러오지 못했습니다.");
        }
      });
  }, [user]);

  const onClick = (e) => {
    setModalOpen(true);
    setPostId(e.target.alt);
  };

  if (isBlocked) {
    return (
      <div className="post-grid">
        <div className="no-posts">차단한 유저입니다.</div>
      </div>
    )
  }

  if (!isFollowing && user.isPrivate && !user.isMe) {
    return (
      <div className="post-grid">
        <div className="no-posts">비공개 유저입니다.</div>
      </div>
    )
  }

  return (
    <div className="post-grid">
      {posts.length === 0 ? (
        <div className="no-posts">게시물 없음</div>
      ) : (
        posts.map((post) => (
          <div key={post.postId} className="post-item">
            <img
              src={post.imageSourcesList?.[0]}
              alt={post.postId}
              onClick={onClick}
            />
          </div>
        ))
      )}

      {modalOpen && (
        <PostDetailView
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          postId={postId}
        />
      )}
    </div>
  );
}

export default UserPostGrid;
