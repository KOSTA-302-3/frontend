import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../../api/axiosInstance";
import "./UserPostGrid.css";
import { useNavigate } from "react-router-dom";
import PostDetailView from "../post/PostDetailView";

function UserPostGrid({ user, onPostCountChange, isBlocked, isFollowing }) {
  const [posts, setPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [postId, setPostId] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const nav = useNavigate();

  const fetchPosts = useCallback(
    async (isReset = false) => {
      if (isLoading || !user.userId) return;

      setIsLoading(true);
      const currentPage = isReset ? 1 : pageNo;

      try {
        const result = await axiosInstance({
          url: `/api/posts/getPostsByUserId`,
          method: "get",
          params: {
            userId: user.userId,
            pageNo: currentPage,
          },
        });

        const newContent = result.data.content;

        if (newContent.length === 0) {
          setHasMore(false);
        }

        if (isReset) {
          setPosts(newContent);
          onPostCountChange?.(result.data.totalElements);
        } else {
          setPosts((prev) => [...prev, ...newContent]);
        }
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          alert("로그인 후 이용해주세요.");
          nav("/login");
        } else {
          alert("게시물을 불러오지 못했습니다.");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [user.userId, pageNo, isLoading, nav, onPostCountChange]
  );

  useEffect(() => {
    if (user.userId && !isBlocked) {
      setPageNo(1);
      setHasMore(true);
      fetchPosts(true);
    }
  }, [user.userId, isBlocked]);

  useEffect(() => {
    if (pageNo > 1) {
      fetchPosts(false);
    }
  }, [pageNo]);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const clientHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (
      scrollTop + clientHeight >= scrollHeight - 100 &&
      !isLoading &&
      hasMore
    ) {
      setPageNo((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore]);

  const onClick = (e) => {
    setModalOpen(true);
    setPostId(e.target.alt);
  };

  if (isBlocked) {
    return (
      <div className="post-grid">
        <div className="no-posts">차단한 유저입니다.</div>
      </div>
    );
  }

  if (!isFollowing && user.isPrivate && !user.isMe) {
    return (
      <div className="post-grid">
        <div className="no-posts">비공개 유저입니다.</div>
      </div>
    );
  }

  return (
    <div className="post-grid">
      {posts.length === 0 && !isLoading ? (
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
