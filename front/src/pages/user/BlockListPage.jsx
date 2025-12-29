import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import ListTabs from "../../components/user/ListTabs";
import BlockList from "../../components/user/BlockList";

function BlockListPage() {
  const [tab, setTab] = useState(0);
  const [blockUsers, setBlockUsers] = useState([]);
  const [blockPosts, setBlockPosts] = useState([]);

  useEffect(() => {
    Promise.all([
      axiosInstance.get(`/api/user/block/USER/0`),
      axiosInstance.get(`/api/user/block/POST/0`),
    ])
      .then(([usersRes, postsRes]) => {
        setBlockUsers(usersRes.data.content);
        setBlockPosts(postsRes.data.content);
      })
      .catch((err) => {
        if (err.response?.status === 401 || err.response?.status === 403) {
          alert("로그인 후 이용해주세요.");
        } else {
          alert("차단 목록을 불러오지 못했습니다.");
        }
      });
  }, []);

  return (
    <div className="list-page">
      <ListTabs
        tabs={[
          { key: 0, label: "차단 유저" },
          { key: 1, label: "차단 게시물" },
        ]}
        active={tab}
        onChange={setTab}
      />

      <BlockList
        tab={tab}
        users={blockUsers}
        setUsers={setBlockUsers}
        posts={blockPosts}
      />
    </div>
  );
};

export default BlockListPage;
