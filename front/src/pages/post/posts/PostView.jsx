import axios from "axios";
import styled from "styled-components";
import PostCard from "../../../components/post/PostCard";
import "../../../index.css";
import { useEffect, useState } from "react";

// PostView.js 내부

const Container = styled.div`
  width: 100%;
  height: auto;

  -webkit-overflow-scrolling: touch;

  display: flex;
  flex-direction: column;
  gap: 3vh;
  padding: 3vh 3vw;
  box-sizing: border-box;
`;

const PostView = ({ selectMenu, page, level }) => {
  let [post, setPost] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [postLevel, setPostLevel] = useState(level);

  console.log(postLevel);

  const selectUrl = ["http://localhost:9000/posts/getAllOffFilter"];

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const clientHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    // 바닥 감지 로직
    if (scrollTop + clientHeight >= scrollHeight - 50) {
      if (!isLoading) {
        setPageNo((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    // 윈도우에 이벤트 붙이기
    window.addEventListener("scroll", handleScroll);

    // 청소하기
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  const fetchPosts = async (pageNo) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await axios.get(selectUrl[selectMenu], {
        params: { pageNo: pageNo },
        withCredentials: true,
      });

      console.log("데이터 수신:", response.data);

      setPost((prev) => [...prev, ...response.data.content]);
    } catch (e) {
      console.error("에러 발생:", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(
    () => {
      fetchPosts(pageNo);
    },
    [pageNo],
    [postLevel]
  );
  return (
    <Container>
      {post.map((item, key) => (
        <PostCard
          key={key}
          username={item.createUserName}
          profileImage="https://i.namu.wiki/i/TUPFV3G5bPhTqh4VvoRYnmkRxa3SoPGPUTzQZt-er6orxSIDgJi_CTbMAFBXyZWw6xJyTOLkbjmL6YpMhFkj-Q.webp"
          postImage="https://amzn-s3-santa-bucket.s3.ap-northeast-2.amazonaws.com/test/7a22f08b-54e8-47bc-b5de-3e2a0934055e-%EC%A0%9C%EB%AA%A9%20%EC%97%86%EB%8A%94%20%EB%94%94%EC%9E%90%EC%9D%B8.png"
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
