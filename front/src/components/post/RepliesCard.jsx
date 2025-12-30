import React from "react";
import ImageCard from "../common/ImageCard";
import ProfileImage from "../common/ProfileImage";
import Badge from "../common/Badge";
import LikeButton from "../common/LikeButton";
import CommentButton from "../common/CommentButton";
import ShareButton from "../common/ShareButton";
import PostDetail from "./RepliesView";
import {
  ProfileImageWrapper,
  Card,
  Header,
  Username,
  Content,
  LikesCount,
  Caption,
} from "./RepliesCard.style";

const RepliesCard = ({
  profileImage,
  username,
  likes,
  caption,
  key,
  userId,
  badgeImageUrl,
}) => {
  return (
    <Card>
      <Header onClick={() => (window.location.href = "/user/" + userId)}>
        <ProfileImageWrapper>
          <ProfileImage src={profileImage} />
        </ProfileImageWrapper>
        <Username>
          {username}

          <Badge imageUrl={badgeImageUrl} />
        </Username>
      </Header>

      <Content>
        <Caption>{caption}</Caption>
      </Content>
    </Card>
  );
};

export default RepliesCard;
