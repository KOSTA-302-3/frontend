import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { ArrowLeftOutlined } from "@ant-design/icons";
import SearchBar from "../../../components/common/SearchBar";
import axiosInstance from "../../../api/axiosInstance";
import PostDetailView from "../../../components/post/PostDetailView";
import RepliesCard from "../../../components/post/RepliesCard";
import { useNavigate } from "react-router-dom";
import person_basic from "../../../assets/person_basic.png";

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
  width: 100%;
  padding-bottom: 10vh;
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  width: 100%;
`;

const PostItem = styled.div`
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

const NoData = styled.div`
  width: 100%;
  color: white;
  text-align: center;
  margin-top: 50px;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchView = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [postId, setPostId] = useState(0);
  const [contentType, setContentType] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentSearch, setCurrentSearch] = useState("");
  const nav = useNavigate();

  const fetchSearchData = useCallback(
    async (query, isTag, page, isReset = false) => {
      if (isLoading && !isReset) return;

      setIsLoading(true);

      try {
        let newContent = [];

        if (isTag) {
          const response = await axiosInstance.get(
            "/api/posts/getPostsByHashTag",
            {
              params: {
                pageNo: page,
                hashTags: query,
              },
              withCredentials: true,
            }
          );
          newContent = response.data.content;

          if (newContent.length === 0) setHasMore(false);

          if (isReset) {
            setPosts(newContent);
          } else {
            setPosts((prev) => [...prev, ...newContent]);
          }
        } else {
          const response = await axiosInstance.get(
            `/api/user/${query}/${page - 1}`,
            {
              withCredentials: true,
            }
          );
          newContent = response.data.content;
          console.log(newContent);

          if (newContent.length === 0) setHasMore(false);

          if (isReset) {
            setUsers(newContent);
          } else {
            setUsers((prev) => [...prev, ...newContent]);
          }
        }
      } catch (e) {
        e;
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading]
  );

  const keyDown = async (e) => {
    if (e.key === "Enter") {
      setUsers([]);
      setPosts([]);
      const str = String(e.target.value);
      setCurrentSearch(str);
      setPageNo(1);
      setHasMore(true);
      window.scrollTo(0, 0);

      if (str.startsWith("#")) {
        setContentType(true);
        setUsers([]);
        await fetchSearchData(str, true, 1, true);
      } else {
        setContentType(false);
        setPosts([]);
        await fetchSearchData(str, false, 1, true);
      }
    }
  };

  useEffect(() => {
    if (pageNo > 1) {
      fetchSearchData(currentSearch, contentType, pageNo, false);
    }
  }, [pageNo]);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const clientHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (
      scrollTop + clientHeight >= scrollHeight - 100 &&
      !isLoading &&
      hasMore &&
      currentSearch
    ) {
      setPageNo((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore, currentSearch]);

  const onClick = (e) => {
    setModalOpen(true);
    setPostId(e.target.alt);
  };

  return (
    <Wrapper>
      <Header>
        <BackButton onClick={() => nav(-2)} />
        <SearchBarWrapper onKeyDown={keyDown}>
          <SearchBar />
        </SearchBarWrapper>
      </Header>

      <Content>
        {contentType ? (
          <>
            {posts.length === 0 && !isLoading ? (
              <NoData>검색된 게시물 없음</NoData>
            ) : (
              <PostGrid>
                {posts.map((post) => (
                  <PostItem key={post.postId}>
                    <img
                      src={post.imageSourcesList?.[0]}
                      alt={post.postId}
                      onClick={onClick}
                    />
                  </PostItem>
                ))}
              </PostGrid>
            )}
          </>
        ) : (
          <div>
            {users.length === 0 && !isLoading ? (
              <NoData>검색된 사용자 없음</NoData>
            ) : (
              users.map((item, key) => (
                <RepliesCard
                  key={`${item.userId || key}`}
                  profileImage={
                    item.profileImage ? item.profileImage : person_basic
                  }
                  username={item.username}
                  userId={item.userId}
                  onClick={() => console.log("User Clicked")}
                />
              ))
            )}
          </div>
        )}

        {modalOpen && (
          <PostDetailView
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            postId={postId}
          />
        )}
      </Content>
    </Wrapper>
  );
};

export default SearchView;
