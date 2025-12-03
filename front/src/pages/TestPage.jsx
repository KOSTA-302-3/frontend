import styled from "styled-components";
import PostCard from "../components/post/PostCard";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3vh;
  padding: 3vh 3vw;
`;

export default function TestPage() {
  return (
    <Container>
      <PostCard
        username="santa_user"
        profileImage="https://via.placeholder.com/150"
        postImage="https://via.placeholder.com/500"
        caption="테스트 게시글입니다! 🎄✨"
        likes={42}
        isLiked={false}
        onLike={(liked) => console.log('좋아요:', liked)}
        onComment={() => console.log('댓글 클릭')}
        onShare={() => console.log('공유 클릭')}
      />
      
      <PostCard
        username="test_user"
        profileImage="https://via.placeholder.com/150"
        postImage="https://via.placeholder.com/500"
        caption="두 번째 게시글 예시"
        likes={128}
        isLiked={true}
        onLike={(liked) => console.log('좋아요:', liked)}
        onComment={() => console.log('댓글 클릭')}
        onShare={() => console.log('공유 클릭')}
      />
    </Container>
  );
}
