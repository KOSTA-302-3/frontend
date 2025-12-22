import { StyledProfileImage } from "./ProfileImage.styles";

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
