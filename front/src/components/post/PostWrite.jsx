import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Input, message, Switch, Carousel } from "antd";
import axiosInstance from "../../api/axiosInstance";

const PostWrite = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPublic, setIsPublic] = useState(true);

  const imageUrls = location.state?.uploadedImages || [];
  const contentValue = location.state?.contentValue || "";
  const visibleCheck = location.state?.visibleCheck || "";
  const method = location.state?.method || 0;
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

    setIsSubmitting(true);
    if (method == 1) {
      try {
        await axiosInstance.put(
          "/posts/updatePosts",
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
    } else {
      try {
        await axiosInstance.post(
          "/posts/createPosts",
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
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "0 20px" }}>
      <h2>새 게시글 작성</h2>

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
        등록하기
      </Button>
    </div>
  );
};

export default PostWrite;
