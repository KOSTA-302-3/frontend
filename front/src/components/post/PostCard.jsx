import { useEffect, useState } from "react";
import ImageCard from "../common/ImageCard";
import ProfileImage from "../common/ProfileImage";
import Badge from "../common/Badge";
import LikeButton from "../common/LikeButton";
import CommentButton from "../common/CommentButton";
import ShareButton from "../common/ShareButton";
import RepliesView from "./RepliesView";
import { Carousel, Modal } from "antd";
import axiosInstance from "../../api/axiosInstance";
import person_basic from "../../assets/person_basic.png";

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
import ReportButton from "../common/ReportButton";
import ReportModal from "../common/ReportModal";
import FeedBackButton from "../common/FeedBackButton";
import FeedBackRate from "./FeedBackRate";
import { useNavigate } from "react-router-dom";

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
  createUserId,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isFeedBackModalOpen, setIsFeedBackModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [feedBackOpen, setFeedBackOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ckLike, setCkLike] = useState(false);
  const [likeNo, setLikeNo] = useState(likes);
  const checkVisible = visible ? true : visible;
  // const profileImages = profileImage ? profileImage : person_basic;
  const profileImages = person_basic;
  const nav = useNavigate();
  const carouselStyle = {
    marginBottom: "20px",

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
          "/api/posts/ckLike",

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
      "api/posts/like",
      { targetId: postId },
      {
        withCredentials: true,
      }
    );
  };

  return (
    <Card>
      <Header>
        <ProfileImageWrapper onClick={() => nav("/user/" + createUserId)}>
          <ProfileImage src={profileImages} />
        </ProfileImageWrapper>
        <Username>
          {username}
          <Badge imageUrl={badgeImageUrl} />
        </Username>

        {userCheck && (
          <PostDropDownMenu
            postId={postId}
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
                      border: "none",
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

        <ReportButton onClick={() => setReportModalOpen(true)} />
        <FeedBackButton onClick={() => setIsFeedBackModalOpen(true)} />
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
          profileImage={profileImages}
        />
      )}

      <ReportModal
        open={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        reportType="POST"
        targetId={postId}
        onSuccess={() => {
          setReportModalOpen(false);
          alert('신고가 접수되었습니다.');
        }}
      />

      <Modal
        title="피드백 레벨 설정"
        open={isFeedBackModalOpen}
        onCancel={() => {
          setIsFeedBackModalOpen(false);
        }}
        footer={null}
        style={{ opacity: "95%" }}
      >
        <FeedBackRate postId={postId} />
      </Modal>
    </Card>
  );
};

export default PostCard;
