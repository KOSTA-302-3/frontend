import { useState } from "react";
import styled from "styled-components";
import SearchBar from "../../components/common/SearchBar";
import AppButton from "../../components/common/AppButton";

const Container = styled.div`
  padding: 3vh 3vw;
  display: flex;
  flex-direction: column;
  gap: 3vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 3vh;
  font-weight: bold;
  color: #333;
`;

const SearchWrapper = styled.div`
  width: 40vw;
`;

const Table = styled.div`
  background: white;
  border-radius: 2vh;
  box-shadow: 0 0.2vh 1vh rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 2fr;
  padding: 2vh 2vw;
  background: #f5f5f5;
  font-weight: bold;
  color: #333;
  font-size: 1.8vh;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 2fr 2fr;
  padding: 2vh 2vw;
  border-bottom: 0.1vh solid #f0f0f0;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #fafafa;
  }
`;

const PostImage = styled.div`
  width: 8vh;
  height: 8vh;
  border-radius: 1vh;
  background-image: url(${props => props.$src});
  background-size: cover;
  background-position: center;
`;

const ButtonWrapper = styled.div`
  width: 10vw;
`;

const PostManagement = () => {
  const [posts] = useState([
    { id: 1, author: "santa_user", caption: "테스트 게시글입니다! 🎄✨", likes: 42, date: "2024-12-01", image: "https://via.placeholder.com/150" },
    { id: 2, author: "test_user", caption: "두 번째 게시글 예시", likes: 128, date: "2024-12-02", image: "https://via.placeholder.com/150" },
    { id: 3, author: "user123", caption: "안녕하세요!", likes: 56, date: "2024-12-03", image: "https://via.placeholder.com/150" },
  ]);

  const handleDelete = (postId) => {
    console.log("게시물 삭제:", postId);
  };

  return (
    <Container>
      <Header>
        <Title>게시물 관리</Title>
        <SearchWrapper>
          <SearchBar />
        </SearchWrapper>
      </Header>

      <Table>
        <TableHeader>
          <div>이미지</div>
          <div>작성자</div>
          <div>내용</div>
          <div>좋아요</div>
          <div>관리</div>
        </TableHeader>
        {posts.map(post => (
          <TableRow key={post.id}>
            <PostImage $src={post.image} />
            <div>{post.author}</div>
            <div>{post.caption}</div>
            <div>{post.likes}개</div>
            <ButtonWrapper>
              <AppButton onClick={() => handleDelete(post.id)}>삭제</AppButton>
            </ButtonWrapper>
          </TableRow>
        ))}
      </Table>
    </Container>
  );
};

export default PostManagement;
