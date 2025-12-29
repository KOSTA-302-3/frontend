import "./ProfileEditPage.css";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChangeImageText, HiddenFileInput, ProfileCircle, ProfileImage, ProfileImageWrapper } from "./ProfileEdit.styles";
import ProfileEditModal from "./ProfileEditModal";
import axiosInstance from "../../api/axiosInstance";
import { updateUser } from "../../store/slices/authSlice";

function ProfileEditPage() {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const loginUser = useSelector((state) => state.auth.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editType, setEditType] = useState(null);

  const openModal = (type) => {
    setEditType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditType(null);
  };

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
        //console.log("url: ", imageUrl);
        dispatch(updateUser({ profileImage: imageUrl}));
      })
      .catch(() => {
        alert("프로필 이미지 업로드에 실패했습니다.");
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
        <EditRow label="아이디" value={loginUser.username} onClick={() => openModal("username")} />
        <EditRow label="소개" value={loginUser.description || "아직 소개가 없습니다"} onClick={() => openModal("description")} />
        <EditRow label="레벨" value={loginUser.level} onClick={() => openModal("level")} />
      </div>

      <ProfileEditModal key={editType} open={isModalOpen} editType={editType} onClose={closeModal} />
    </div>
  );
}

function EditRow({ label, value, placeholder, readonly, onClick }) {
  return (
    <div className="edit-row" onClick={onClick}>
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
