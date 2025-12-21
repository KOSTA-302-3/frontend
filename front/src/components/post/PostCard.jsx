import { useEffect, useState } from "react";
import ImageCard from "../common/ImageCard";
import ProfileImage from "../common/ProfileImage";
import Badge from "../common/Badge";
import LikeButton from "../common/LikeButton";
import CommentButton from "../common/CommentButton";
import ShareButton from "../common/ShareButton";
import RepliesView from "./RepliesView";
import { Carousel } from "antd";
import axiosInstance from "../../api/axiosInstance";

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

  badgeImageUrl,

  onShare,
  postId,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ckLike, setCkLike] = useState(false);

  const carouselStyle = {
    marginBottom: "20px",
    backgroundColor: "#f0f2f5",
    borderRadius: "8px",
    overflow: "hidden",
  };

  const imageWrapperStyle = {
    height: "400px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#000",
  };

  const imageUrls = postImage || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "/posts/ckLike",

          {
            params: {
              targerId: postId,
            },
            withCredentials: true,
          }
        );

        console.log(postId + " : " + response.data);
        setCkLike(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onLike = () => {
    setCkLike(!ckLike);
  };

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
        {/* <ImageCard image={postImage} /> */}

        {imageUrls.length > 0 && (
          <Carousel draggable arrows style={carouselStyle}>
            {imageUrls.map((url, index) => (
              <div key={index}>
                <div style={imageWrapperStyle}>
                  <img
                    src={url}
                    alt={`preview-${index}`}
                    style={{
                      maxHeight: "100%",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </ImageWrapper>

      <Actions>
        <LikeButton ckLiked={ckLike} onClick={onLike} />

        <CommentButton onClick={() => setModalOpen(true)} />

        <ShareButton onClick={onShare} />
      </Actions>

      <Content>
        <LikesCount>좋아요 {likes}개</LikesCount>
        <Caption>{caption}</Caption>
      </Content>

      {modalOpen && (
        <RepliesView
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          postId={postId}
        />
      )}
    </Card>
  );
};

export default PostCard;
