import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../api/axiosInstance";
import { Container } from "./PostView.style";
import PostCard from "../../../components/post/PostCard";

const PostView = () => {
  const level = useSelector((state) => state.post.level);
  const curLayer = useSelector((state) => state.post.layer);

  const [posts, setPosts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const selectUrl = ["/posts/getAllOnFilter", "/posts/getFollowOnFilter"];

  const fetchPosts = useCallback(
    async (isReset = false) => {
      if (isLoading) return;

      setIsLoading(true);

      const currentPage = isReset ? 1 : pageNo;

      try {
        const url = selectUrl[curLayer] || selectUrl[0];

        const response = await axiosInstance.get(url, {
          params: {
            pageNo: currentPage,
            postLevel: level,
          },
          withCredentials: true,
        });

        console.log(
          `페이지: ${currentPage}, 레벨: ${level}, 데이터수신:`,
          response.data
        );

        const newContent = response.data.content;

        if (newContent.length === 0) {
          setHasMore(false);
        }

        if (isReset) {
          setPosts(newContent);
        } else {
          setPosts((prev) => [...prev, ...newContent]);
        }
      } catch (e) {
        console.error("에러 발생:", e);
      } finally {
        setIsLoading(false);
      }
    },
    [curLayer, level, pageNo]
  );

  useEffect(() => {
    setPageNo(1);
    setHasMore(true);
    fetchPosts(true);
  }, [curLayer, level]);

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
  }, [isLoading, hasMore]); // isLoading이나 hasMore가 바뀔 때 리스너 갱신

  return (
    <Container>
      {posts.map((item) => (
        <PostCard
          key={item.postId}
          username={item.createUserName}
          profileImage={
            item.userProfileImage || "https://placeholder.com/user.png"
          }
          postImage={item.imageUrl || "https://placeholder.com/post.png"}
          caption={item.content}
          likes={item.likeCount}
          isLiked={false}
          onLike={(liked) => console.log("좋아요:", liked)}
          onComment={() => console.log("댓글 클릭")}
          onShare={() => console.log("공유 클릭")}
          postId={item.postId}
        />
      ))}
    </Container>
  );
};

export default PostView;
