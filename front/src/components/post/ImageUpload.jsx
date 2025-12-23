import React, { useState, useEffect } from "react";
import { Upload, Button, message, Carousel } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../..//api/axiosInstance";

const { Dragger } = Upload;

const ImageUpload = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [previewUrls, setPreviewUrls] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    previewUrls.forEach((url) => URL.revokeObjectURL(url));

    const newUrls = fileList.map((file) => {
      return URL.createObjectURL(file.originFileObj);
    });

    setPreviewUrls(newUrls);

    return () => {
      newUrls.forEach((url) => URL.revokeObjectURL(url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileList]);

  const resizeFile = (file) =>
    new Promise((resolve) => {
      const maxWidth = 1280; // 최대 너비
      const maxHeight = 1280; // 최대 높이
      const compressQuality = 0.8; // 압축률 (0.1 ~ 1.0)

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";

          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              const resizedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(resizedFile);
            },
            file.type,
            compressQuality
          );
        };
      };
    });

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(0, 5));
  };

  const handleUploadAndMove = async () => {
    if (fileList.length === 0) {
      message.warning("사진을 최소 1장 이상 선택해주세요!");
      return;
    }

    setUploading(true);
    const formData = new FormData();

    try {
      const resizedFiles = await Promise.all(
        fileList.map((item) => resizeFile(item.originFileObj))
      );

      resizedFiles.forEach((file) => {
        formData.append("files", file);
      });

      const response = await axiosInstance.post("posts/imageUpload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      const uploadedImageUrls = response.data;

      message.success("사진 처리가 완료되었습니다.");

      navigate("/write", {
        state: {
          uploadedImages: uploadedImageUrls,
          method: 1,
        },
      });
    } catch (error) {
      console.error("업로드 실패:", error);
      message.error("업로드 중 오류가 발생했습니다.");
    } finally {
      setUploading(false);
    }
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
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "0 10px",
        bottom: "0px",
      }}
    >
      {/* 미리보기 슬라이더 (이미지가 있을 때만 표시) */}
      {previewUrls.length > 0 && (
        <Carousel draggable arrows style={carouselStyle}>
          {previewUrls.map((url, index) => (
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

      <ImgCrop aspectSlider showGrid rotationSlider>
        <Dragger
          multiple
          fileList={fileList}
          onChange={onChange}
          beforeUpload={() => false}
          showUploadList={false}
          disabled={fileList.length >= 5}
          style={{ color: "blue" }}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text" style={{ color: "blue" }}>
            클릭하거나 이미지를 드래그하여 추가하세요
          </p>
          <p className="ant-upload-hint" style={{ color: "blue" }}>
            최대 5장까지 업로드 가능합니다.
          </p>
        </Dragger>
      </ImgCrop>

      {/* 액션 버튼 */}
      <Button
        type="primary"
        onClick={handleUploadAndMove}
        loading={uploading}
        block
        style={{
          marginTop: 24,
          height: "50px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "blue",
        }}
      >
        다음 (글 작성하기)
      </Button>
    </div>
  );
};

export default ImageUpload;
