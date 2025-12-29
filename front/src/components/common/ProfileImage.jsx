import { StyledProfileImage } from "./ProfileImage.styles";
import person_basic from "../../assets/person_basic.png";

const ProfileImage = ({ src, alt = "프로필", ...props }) => {
  return <StyledProfileImage src={src || person_basic} alt={alt} {...props} />;
};

export default ProfileImage;
