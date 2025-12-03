import ImageCard from "../common/ImageCard";
import ProfileImage from "../common/ProfileImage";
import LikeButton from "../common/LikeButton";
import CommentButton from "../common/CommentButton";
import ShareButton from "../common/ShareButton";
import "./PostCard.css";

const PostCard = ({ 
  username, 
  profileImage, 
  postImage, 
  caption, 
  likes = 0,
  isLiked = false,
  onLike,
  onComment,
  onShare
}) => {
  return (
    <div className="post-card">
      <div className="post-header">
        <div className="profile-image-wrapper">
          <ProfileImage src={profileImage} />
        </div>
        <div className="username">{username}</div>
      </div>

      <div className="image-wrapper">
        <ImageCard image={postImage} />
      </div>

      <div className="post-actions">
        <LikeButton isLiked={isLiked} onClick={onLike} />
        <CommentButton onClick={onComment} />
        <ShareButton onClick={onShare} />
      </div>

      <div className="post-content">
        <div className="likes-count">좋아요 {likes}개</div>
        <div className="caption">
          <span className="caption-username">{username}</span>
          {caption}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
