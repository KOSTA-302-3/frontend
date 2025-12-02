import styled from "styled-components";
import ImageCard from "../common/ImageCard";
import ProfileImage from "../common/ProfileImage";
import LikeButton from "../common/LikeButton";
import CommentButton from "../common/CommentButton";
import ShareButton from "../common/ShareButton";

const Card = styled.div`
  width: 100%;
  background: #1a001f;
  border-radius: 2vh;
  overflow: hidden;
  margin-bottom: 3vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 2vh 3vw;
  gap: 2vw;
`;

const ProfileImageWrapper = styled.div`
  width: 5vh;
  height: 5vh;
`;

const Username = styled.div`
  color: #e6c0c7;
  font-size: 2vh;
  font-weight: bold;
  flex: 1;
`;

const ImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1;
`;

const Actions = styled.div`
  display: flex;
  gap: 3vw;
  padding: 2vh 3vw;
`;

const Content = styled.div`
  padding: 0 3vw 2vh;
  color: #e6c0c7;
`;

const LikesCount = styled.div`
  font-size: 1.8vh;
  font-weight: bold;
  margin-bottom: 1vh;
`;

const Caption = styled.div`
  font-size: 1.8vh;
  line-height: 1.5;
  
  .username {
    font-weight: bold;
    margin-right: 1vw;
  }
`;

const PostCard = ({ 
  username, 
  profileImage, 
  postImage, 
  caption, 
  likes = 0,
  isLiked = false,
  onLike,
  onComment,
  onShare
}) => {
  return (
    <Card>
      <Header>
        <ProfileImageWrapper>
          <ProfileImage src={profileImage} />
        </ProfileImageWrapper>
        <Username>{username}</Username>
      </Header>

      <ImageWrapper>
        <ImageCard image={postImage} />
      </ImageWrapper>

      <Actions>
        <LikeButton isLiked={isLiked} onClick={onLike} />
        <CommentButton onClick={onComment} />
        <ShareButton onClick={onShare} />
      </Actions>

      <Content>
        <LikesCount>좋아요 {likes}개</LikesCount>
        <Caption>
          <span className="username">{username}</span>
          {caption}
        </Caption>
      </Content>
    </Card>
  );
};

export default PostCard;
