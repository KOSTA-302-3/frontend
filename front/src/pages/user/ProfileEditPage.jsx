import { useNavigate } from "react-router-dom";
import "./ProfileEditPage.css";
import { useState } from "react";

function ProfileEditPage() {
  const nav = useNavigate();
  const [level, setLevel] = useState(12);

  return (
    <div className="profile-edit-page">

      {/* 프로필 이미지 */}
      <div className="profile-image-section">
        <img
          className="profile-image"
          src="/images/default-profile.png"
          alt="profile"
        />
        <button className="edit-photo-btn">
          Edit profile picture
        </button>
      </div>

      {/* 정보 목록 */}
      <div className="profile-edit-list">
        <EditRow label="아이디" value="mmynzi" />
        <EditRow label="소개" value="아직 소개가 없습니다" placeholder />
        <div className="edit-row level-row last-row">
          <span className="edit-label">레벨</span>
          <div className="level-control">
            <input
              type="range"
              min={1}
              max={20}
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
