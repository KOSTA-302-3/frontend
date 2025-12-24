import React, { useContext } from 'react';
import { SignUpContext } from './SignUpPage';
import { useNavigate } from 'react-router-dom';
import { ButtonRow, SubTitle, Title } from './SignUp.styles';
import { StyledButton, StyledInput } from '../../components/common/LoginForm.style';
import { ChangeImageText, HiddenFileInput, ProfileCircle, ProfileImage, ProfileImageWrapper } from '../user/ProfileEdit.styles';
import axiosInstance from '../../api/axiosInstance';

function SignUpProfile() {
  const nav = useNavigate();
  const { newUser, setNewUser } = useContext(SignUpContext);

   const uploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    // setUploading(true);

    axiosInstance({
      url: "/api/upload/profile-image",
      method: "post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        const imageUrl = res.data.url;

        setNewUser({
          ...newUser,
          profileImage: imageUrl,
        });
      })
      .catch(() => {
        alert("프로필 이미지 업로드에 실패했습니다.");
      })
      .finally(() => {
        // setUploading(false);
      });
  };

  return (
    <>
      <SubTitle>프로필 설정</SubTitle>

      <ProfileImageWrapper>
        <ProfileCircle>
          {newUser.profileImage && (
            <ProfileImage
              src={newUser.profileImage}
              alt="profile-preview"
            />
          )}
        </ProfileCircle>

        <HiddenFileInput
          type="file"
          accept="image/*"
        //   ref={fileInputRef}
        //   onChange={uploadImage}
        />

         <ChangeImageText onClick={uploadImage}>
          {1===2 ? "업로드 중..." : "프로필 이미지 변경"}
        </ChangeImageText>
      </ProfileImageWrapper>

      <StyledInput
        placeholder="한 줄 소개"
        value={newUser.description}
        onChange={(e) =>
          setNewUser({ ...newUser, description: e.target.value })
        }
      />

      <ButtonRow>
        <StyledButton block type="primary" onClick={() => nav("/signup/level")}>
          다음
        </StyledButton>
      </ButtonRow>
    </>
  );
}

export default SignUpProfile;