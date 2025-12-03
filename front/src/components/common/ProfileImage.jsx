import "./ProfileImage.css";

const ProfileImage = ({ src, alt = "프로필", ...props }) => {
  return (
    <img
      className="profile-image"
      src={src || "https://via.placeholder.com/150"}
      alt={alt}
      {...props}
    />
  );
};

export default ProfileImage;
