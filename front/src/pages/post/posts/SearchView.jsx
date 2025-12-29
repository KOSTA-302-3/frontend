import React, { useState } from "react";
import styled from "styled-components";
import { ArrowLeftOutlined } from "@ant-design/icons";
import SearchBar from "../../../components/common/SearchBar";
import axiosInstance from "../../../api/axiosInstance";
import PostDetailView from "../../../components/post/PostDetailView";
import RepliesCard from "../../../components/post/RepliesCard";
import { useNavigate } from "react-router-dom";
const SearchView = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [postId, setPostId] = useState(0);
  const [contentType, setContentType] = useState(true);
  const nav = useNavigate();

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

  const keyDown = async (e) => {
    if (e.key === "Enter") {
      console.log(e.key);
      const str = String(e.target.value);
      console.log(str);
      if (str.startsWith("#")) {
        setContentType(true);
        try {
          const response = await axiosInstance.get(
            "/api/posts/getPostsByHashTag",
            {
              params: {
                pageNo: 1,
                hashTags: str,
              },
              withCredentials: true,
            }
          );

          console.log(response.data.content);
          setPosts(response.data.content);
        } catch (e) {
          console.error("에러 발생:", e);
        }
      } else {
        setContentType(false);

        try {
          const response = await axiosInstance.get(
            "/api/user/" + str + "/" + Number(0),
            {
              withCredentials: true,
            }
          );

          console.log(response.data.content);
          setUsers(response.data.content);
        } catch (e) {
          console.error("에러 발생:", e);
        }
      }
    }
  };

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
      {contentType ? (
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
      ) : (
        users.map((item, key) => (
          <RepliesCard
            key={`${item.userId || key}`}
            profileImage={item.profileImage}
            username={item.username}
            userId={item.userId}
            onClick={() => console.log(11111)}
          />
        ))
      )}
    </Wrapper>
  );
};

export default SearchView;
