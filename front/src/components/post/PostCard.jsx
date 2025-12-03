import ImageCard from "../common/ImageCard";
import ProfileImage from "../common/ProfileImage";
import LikeButton from "../common/LikeButton";
import CommentButton from "../common/CommentButton";
import ShareButton from "../common/ShareButton";
import { 
  Card, 
  Header, 
  ProfileImageWrapper, 
  Username, 
  ImageWrapper, 
  Actions, 
  Content, 
  LikesCount, 
  Caption 
} from "./PostCard.styles";

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
