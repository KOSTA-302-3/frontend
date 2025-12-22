import { StyledBadge } from "./Badge.styles";

const Badge = ({ imageUrl, ...props }) => {
  if (!imageUrl) return null;

  return <StyledBadge $imageUrl={imageUrl} {...props} />;
};

export default Badge;
