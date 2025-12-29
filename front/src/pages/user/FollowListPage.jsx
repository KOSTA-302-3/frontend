import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import ListTabs from "../../components/user/ListTabs";
import FollowList from "../../components/user/FollowList";
import { useParams, useSearchParams } from "react-router-dom";
import PendingList from "../../components/user/PendingList";
import { useSelector } from "react-redux";

function FollowListPage() {
  const { id } = useParams();
  const loginUser = useSelector((state) => state.auth.user);
  const [searchParams, setSearchParams] = useSearchParams();

  const tab = searchParams.get("tab") || "followers";

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [pendings, setPendings] = useState([]);

  const tabs = [
    { key: "followers", label: `${followers.length} 팔로워` },
    { key: "followings", label: `${following.length} 팔로잉` },
  ];

  const removePending = (userId) => {
    setPendings(prev => prev.filter(user => user.userId !== userId));
  }

  if (Number(id) === loginUser.userId) {
    tabs.push({
      key: "pendings",
      label: `${pendings.length} 팔로잉 요청`,
    });
  }

  useEffect(() => {
    //axios 요청 동시에 처리
    Promise.all([
      axiosInstance.get(`/api/user/${id}/followers/0`),
      axiosInstance.get(`/api/user/${id}/followings/0`),
      axiosInstance.get(`/api/user/pending/0`),
    ]).then(([f1, f2, f3]) => {
      setFollowers(f1.data.content);
      setFollowing(f2.data.content);
      setPendings(f3.data.content);
    });
  }, [id, loginUser]);

  return (
    <div className="list-page">
      <ListTabs
        tabs={tabs}
        active={tab}
        onChange={(nextTab) => setSearchParams({ tab: nextTab })}
      />

      {tab === "followers" && <FollowList list={followers} />}
      {tab === "followings" && <FollowList list={following} />}
      {Number(id) === loginUser?.userId
        ? tab === "pendings" && <PendingList list={pendings} onRemove={removePending} />
        : null}
    </div>
  );
}

export default FollowListPage;
