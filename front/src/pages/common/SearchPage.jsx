import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { ArrowLeftOutlined } from "@ant-design/icons";
import SearchBar from "../../components/common/SearchBar";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { useSelector } from "react-redux";
import PostDetailView from "../../components/post/PostDetailView";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #1a001f;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  position: relative;
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 12vh;
  background: #1a001f;
  display: flex;
  align-items: center;
  padding: 0 4vw;
  gap: 3vw;
  box-sizing: border-box;
  z-index: 100;
`;

const BackButton = styled(ArrowLeftOutlined)`
  font-size: 3.5vh;
  color: #e6c0c7;
  cursor: pointer;
`;

const SearchBarWrapper = styled.div`
  flex: 1;
  height: 5vh;
`;

const Content = styled.div`
  margin-top: 13vh;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  width: 100%;
  padding-bottom: 10vh;
`;

const GridItem = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #333;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function SearchPage() {
  const nav = useNavigate();
  const [posts, setPosts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const level = useSelector((state) => state.post.level);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const fetchPosts = useCallback(
    async (isReset = false) => {
      if (isLoading) return;

      setIsLoading(true);
      const currentPage = isReset ? 1 : pageNo;

      try {
        const response = await axiosInstance.get("/api/posts/getAllOnFilter", {
          params: {
            pageNo: currentPage,
            postLevel: level,
          },
          withCredentials: true,
        });

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
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    },
    [pageNo, isLoading, level]
  );

  useEffect(() => {
    setPageNo(1);
    setHasMore(true);
    fetchPosts(true);
  }, []);

  useEffect(() => {
    if (pageNo > 1) {
      fetchPosts(false);
    }
  }, [pageNo]);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const clientHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading && hasMore) {
      setPageNo((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore]);

  const onBack = () => {
    nav(-1);
  };

  const handlePostClick = (postId) => {
    setSelectedPostId(postId);
    setModalOpen(true);
  };

  return (
    <Wrapper>
      <Header>
        <BackButton onClick={onBack} />
        <SearchBarWrapper onClick={() => nav("/searchDetail")}>
          <SearchBar />
        </SearchBarWrapper>
      </Header>

      <Content>
        {posts.map((item) => (
          <GridItem
            key={item.postId}
            onClick={() => handlePostClick(item.postId)}
          >
            <img
              src={item.imageSourcesList || "https://placeholder.com/post.png"}
              alt="post thumbnail"
            />
          </GridItem>
        ))}
      </Content>

      {modalOpen && (
        <PostDetailView
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          postId={selectedPostId}
        />
      )}
    </Wrapper>
  );
}
