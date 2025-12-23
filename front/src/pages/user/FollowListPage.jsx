import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import ListTabs from "../../components/user/ListTabs";
import FollowList from "../../components/user/FollowList";
import { useParams, useSearchParams } from "react-router-dom";

function FollowListPage() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const tab = searchParams.get("tab") || "followers";

  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    //axios 요청 동시에 처리
    Promise.all([
      axiosInstance.get(`/api/user/${id}/followers/0`),
      axiosInstance.get(`/api/user/${id}/followings/0`),
    ]).then(([f1, f2]) => {
      setFollowers(f1.data.content);
      setFollowing(f2.data.content);
    });
  }, []);

  return (
    <div className="list-page">
      <ListTabs
        tabs={[
          { key: "followers", label: `${followers.length} 팔로워` },
          { key: "followings", label: `${following.length} 팔로잉` },
        ]}
        active={tab}
        onChange={(nextTab) => setSearchParams({ tab: nextTab })}
      />

      {tab === "followers" && <FollowList list={followers} />}
      {tab === "followings" && <FollowList list={following} />}
    </div>
  );
}

export default FollowListPage;
