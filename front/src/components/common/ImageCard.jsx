import { Card } from "./ImageCard.styles";

const ImageCard = ({ image, bgColor, onClick, ...props }) => {
  return (
    <Card 
      $image={image} 
      $bgColor={bgColor}
      onClick={onClick}
      {...props}
    />
  );
};

export default ImageCard;
