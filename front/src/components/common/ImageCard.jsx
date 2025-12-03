import "./ImageCard.css";

const ImageCard = ({ image, bgColor, onClick, ...props }) => {
  const style = {
    backgroundColor: bgColor || '#2d1a33',
    backgroundImage: image ? `url(${image})` : 'none'
  };

  return (
    <div 
      className="image-card"
      style={style}
      onClick={onClick}
      {...props}
    />
  );
};

export default ImageCard;
