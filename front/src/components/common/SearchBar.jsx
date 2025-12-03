import { SearchOutlined } from "@ant-design/icons";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <SearchOutlined className="search-icon" />
      <input className="search-input" placeholder="검색" />
    </div>
  );
};

export default SearchBar;
