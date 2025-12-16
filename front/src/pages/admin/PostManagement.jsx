import { useState } from "react";
import SearchBar from "../../components/common/SearchBar";
import AppButton from "../../components/common/AppButton";
import { 
  Container, 
  Header, 
  Title, 
  SearchWrapper, 
  Table, 
  TableHeader, 
  TableRow, 
  PostImage, 
  ButtonWrapper 
} from "./PostManagement.styles";

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
