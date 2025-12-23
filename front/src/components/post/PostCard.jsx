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
import PostDropDownMenu from "./PostDropDownMenu";

const PostCard = ({
  username,
  profileImage,
  postImage,
  caption,
  likes,
  badgeImageUrl,
  onShare,
  postId,
  userCheck,
  visible,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ckLike, setCkLike] = useState(false);
  const [likeNo, setLikeNo] = useState(likes);
  const checkVisible = visible ? visible : true;

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
    ckLike ? setLikeNo(likeNo - 1) : setLikeNo(likeNo + 1);
    setCkLike(!ckLike);

    axiosInstance.post(
      "posts/like",
      { targetId: postId },
      {
        withCredentials: true,
      }
    );
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

        {userCheck && (
          <PostDropDownMenu
            post={postId}
            uploadedImages={imageUrls}
            content={caption}
            visibleCheck={checkVisible}
          />
        )}
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
        <LikesCount>좋아요 {likeNo}개</LikesCount>
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
