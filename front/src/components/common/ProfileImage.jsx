import styled from "styled-components";

const StyledProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 0.2vh solid #e6c0c7;
  display: block;
`;

const ProfileImage = ({ src, alt = "프로필", ...props }) => {
  return (
    <StyledProfileImage
      src={src || "https://via.placeholder.com/150"}
      alt={alt}
      {...props}
    />
  );
};

export default ProfileImage;
