import axios from "axios";
import styled from "styled-components";
import PostCard from "../../components/post/PostCard";
import "../../index.css";
import { useEffect, useState } from "react";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3vh;
  padding: 3vh 3vw;
`;

const PostView = () => {
  let pageNo = 1;
  let [test, setTest] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:9000/posts/getAllOffFilter", {
        params: { pageNo: pageNo },
        withCredentials: true,
      })
      .then((response) => {
        console.log("데이터 수신:", response.data);
        setTest(response.data.content);
        pageNo++;
      })
      .catch((e) => {
        console.error("에러 발생:", e);
      });
  }, []);
  return (
    <Container>
      {test.map((item) => (
        <PostCard
          username={item.createUserName}
          profileImage="https://via.placeholder.com/150"
          postImage="https://via.placeholder.com/500"
          caption={item.content}
          likes={item.likeCount}
          isLiked={false}
          onLike={(liked) => console.log("좋아요:", liked)}
          onComment={() => console.log("댓글 클릭")}
          onShare={() => console.log("공유 클릭")}
        />
      ))}
    </Container>
  );
};

export default PostView;
