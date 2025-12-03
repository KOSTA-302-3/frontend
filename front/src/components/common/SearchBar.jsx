import { Wrapper, Input, StyledIcon } from "./SearchBar.styles";

const SearchBar = () => {
  return (
    <Wrapper>
      <StyledIcon />
      <Input placeholder="검색" />
    </Wrapper>
  );
};

export default SearchBar;
