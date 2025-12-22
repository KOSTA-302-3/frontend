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

const RepliesCard = ({ profileImage, username, likes, caption }) => {
  return (
    <Card>
      <Header>
        <ProfileImageWrapper>
          <ProfileImage src={profileImage} />
        </ProfileImageWrapper>
        <Username>{username}</Username>
      </Header>
      <hr />
      <Content>
        <Caption>{caption}</Caption>
        <LikesCount> {likes}개</LikesCount>
      </Content>
    </Card>
  );
};

export default RepliesCard;
