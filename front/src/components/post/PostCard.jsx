import { useState } from "react";
import ImageCard from "../common/ImageCard";
import ProfileImage from "../common/ProfileImage";
import Badge from "../common/Badge";
import LikeButton from "../common/LikeButton";
import CommentButton from "../common/CommentButton";
import ShareButton from "../common/ShareButton";
import PostDetail from "../post/PostDetail";

import {
  Card,
  Header,
  ProfileImageWrapper,
  Username,
  ImageWrapper,
  Actions,
  Content,
  LikesCount,
  Caption,
} from "./PostCard.styles";

const PostCard = ({
  username,
  profileImage,
  postImage,
  caption,
  likes = 0,
  isLiked = false,
  badgeImageUrl,
  onLike,
  onShare,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Card>
      <Header>
        <ProfileImageWrapper>
          <ProfileImage src={profileImage} />
        </ProfileImageWrapper>
        <Username>
          {username}
          <Badge imageUrl={badgeImageUrl} />
        </Username>
      </Header>

      <ImageWrapper>
        <ImageCard image={postImage} />
      </ImageWrapper>

      <Actions>
        <LikeButton isLiked={isLiked} onClick={onLike} />

        <CommentButton onClick={() => setModalOpen(true)} />

        <ShareButton onClick={onShare} />
      </Actions>

      <Content>
        <LikesCount>좋아요 {likes}개</LikesCount>
        <Caption>{caption}</Caption>
      </Content>

      {modalOpen && (
        <PostDetail open={modalOpen} onClose={() => setModalOpen(false)} />
      )}
    </Card>
  );
};

export default PostCard;
