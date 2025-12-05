import { LoadingWrapper, Spinner } from "./Loading.styles";

const Loading = ({ fullScreen = false, size = "large", ...props }) => {
  return (
    <LoadingWrapper $fullScreen={fullScreen} {...props}>
      <Spinner $size={size} />
    </LoadingWrapper>
  );
};

export default Loading;
