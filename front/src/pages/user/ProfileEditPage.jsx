import { useNavigate } from "react-router-dom";
import "./ProfileEditPage.css";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../api/axiosInstance";
import { ChangeImageText, HiddenFileInput, ProfileCircle, ProfileImage, ProfileImageWrapper } from "./ProfileEdit.styles";

function ProfileEditPage() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const loginUser = useSelector((state) => state.auth.user);
  const [level, setLevel] = useState(loginUser.level ?? 10);

  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    axiosInstance({
      url: "/api/user/upload/profile",
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        const imageUrl = res.data;
        console.log("url: ", imageUrl);

      })
      .catch(() => {
        alert("프로필 이미지 업로드에 실패했습니다.");
      })
      .finally(() => {
        // setUploading(false);
      });
  };

  return (
    <div className="profile-edit-page">

      {/* 프로필 이미지 */}
      <ProfileImageWrapper>
        <ProfileCircle>
          {loginUser.profileImage && <ProfileImage src={loginUser.profileImage} alt="profile-image" />}
        </ProfileCircle>
        <HiddenFileInput
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={uploadImage}
        />

        <ChangeImageText onClick={() => fileInputRef.current?.click()}>
          프로필 이미지 변경
        </ChangeImageText>
      </ProfileImageWrapper>

      {/* 정보 목록 */}
      <div className="profile-edit-list">
        <EditRow label="아이디" value={loginUser.username} />
        <EditRow label="소개" value={loginUser.description || "아직 소개가 없습니다"} placeholder />
        <div className="edit-row level-row last-row">
          <span className="edit-label">레벨</span>
          <div className="level-control">
            <input
              type="range"
              min={1}
              max={10}
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            />
            <span className="level-value">{level}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EditRow({ label, value, placeholder, readonly }) {
  return (
    <div className="edit-row">
      <span className="edit-label">{label}</span>
      <span
        className={`edit-value 
          ${placeholder ? "placeholder" : ""} 
          ${readonly ? "readonly" : ""}`}
      >
        {value}
      </span>
    </div>
  );
}

export default ProfileEditPage;
