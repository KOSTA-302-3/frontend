import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, message, Switch, Carousel } from "antd";
import axiosInstance from "../../api/axiosInstance";
import { StyledProfileImage } from "../common/ProfileImage.styles";

const PostWrite = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const contentValue = location.state?.contentValue || "";
  const [content, setContent] = useState(contentValue);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const visibleCheck = location.state?.visibleCheck;
  const [isPublic, setIsPublic] = useState(visibleCheck);

  const imageUrlsa = location.state?.uploadedImages || [];
  const [imageUrls, setImageUrls] = useState(imageUrlsa);
  const postId = location.state.postId;
  const method = location.state?.method || 0;

  console.log(postId);
  useEffect(() => {
    if (imageUrls.length === 0) {
      message.error("이미지 정보가 없습니다. 사진을 먼저 선택해주세요.");
      navigate("/posts");
    }
  }, [imageUrls, navigate]);

  const handleFinalSubmit = async () => {
    if (!content.trim()) {
      message.warning("내용을 입력해주세요.");
      return;
    }

    console.log(method);
    setIsSubmitting(true);
    if (method == 2) {
      try {
        await axiosInstance.put(
          "/api/posts/updatePosts",
          {
            postId: postId,
            createAt: null,
            content: content,
            contentVisible: isPublic,
            hashTagsList: extractHashTags(content),
            imageSourcesList: imageUrls,
          },
          { withCredentials: true }
        );

        message.success("게시글이 성공적으로 처리되었습니다!");
        navigate(-2);
      } catch (e) {
        console.error(e);
        message.error("게시글 처리에 실패했습니다.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      try {
        await axiosInstance.post(
          "/api/posts/createPosts",
          {
            createAt: new Date(),
            content: content,
            imageUrls: imageUrls,
            contentVisible: isPublic,
            hashTagsList: extractHashTags(content),
            imageSourcesList: imageUrls,
          },
          { withCredentials: true }
        );

        message.success("게시글이 성공적으로 처리되었습니다!");
        navigate(-2);
      } catch (e) {
        console.error(e);
        message.error("게시글 처리에 실패했습니다.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const extractHashTags = (text) => {
    if (!text) return []; // 빈 문자열이면 빈 배열 반환

    const regex = /#[\w가-힣]+/g;

    const tags = text.match(regex) || [];

    return tags;
  };

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
    position: "relative",
  };

  const onDelButton = (e) => {
    const delImg = e.target.parentNode.parentNode.parentNode.firstChild.alt;

    if (delImg === undefined) {
      message.error("일시적인 오류입니다 다시 시도해주세요");
      return;
    }
    console.log("인덱스 : " + delImg);
    if (imageUrls.length <= 1) {
      console.log(imageUrls);
      message.error("사진은 최소 1장있어야 합니다.");
      return;
    }
    console.log(delImg);
    const newUrls = imageUrls.filter((_, index) => index !== Number(delImg));
    setImageUrls(newUrls);
    message.success("삭제 되었습니다");
  };

  const backButtonClick = () => {
    navigate(-1);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "0 20px" }}>
      <h2> {method === 2 ? "게시글 수정" : "새 게시글 작성"}</h2>

      {imageUrls.length > 0 && (
        <Carousel draggable arrows style={carouselStyle}>
          {imageUrls.map((url, index) => (
            <div key={index}>
              <div style={imageWrapperStyle}>
                <img
                  src={url}
                  alt={`${index}`}
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
                <Button
                  style={{
                    marginBottom: "90%",
                    marginLeft: "90%",
                    position: "absolute",
                    borderRadius: "30px",
                    border: "0px",
                    background: "#FFFFFF",
                  }}
                  onClick={onDelButton}
                >
                  X
                </Button>
              </div>
            </div>
          ))}
        </Carousel>
      )}

      <Input.TextArea
        rows={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="어떤 이야기를 나누고 싶으신가요? (태그할 게시물은 앞에 #을 붙여주세요)"
        style={{ resize: "none" }}
      />

      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <span style={{ fontWeight: "bold" }}>공개여부</span>
        <Switch
          checked={isPublic}
          onChange={(checked) => setIsPublic(checked)}
          checkedChildren="공개"
          unCheckedChildren="비공개"
        />
      </div>

      <Button
        type="primary"
        onClick={handleFinalSubmit}
        loading={isSubmitting}
        block
        style={{ marginTop: 20, height: "45px", fontSize: "16px" }}
      >
        {method === 2 ? "수정하기" : "등록하기"}
      </Button>

      <Button
        type="danger"
        onClick={backButtonClick}
        block
        style={{
          marginTop: 24,
          height: "50px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "black",
          background: "red",
        }}
      >
        취소 (이전으로 돌아가기)
      </Button>
    </div>
  );
};

export default PostWrite;
