import { Input } from "antd";
import { Replies } from "./InputReplies.style";
const InputReplies = ({ onChange, value }) => (
  <Replies placeholder="댓글" onChange={onChange} value={value} />
);
export default InputReplies;
