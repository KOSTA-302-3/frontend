import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import "./UserPostGrid.css";
import { useNavigate } from "react-router-dom";

function UserPostGrid({ userId }) {
  const [posts, setPosts] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    if (!userId) return;

    axiosInstance({
        url: `/posts/getPostsByUserId`,
        method: "get",
        params: {
            userId,
            pageNo: 1,
        },
    })
    .then((result) => {
        //console.log("posts", result.data.content);
        setPosts(result.data.content);
    })
    .catch((err) => {
        console.log(err);

        if (err.response?.status === 401 || err.response?.status === 403) {
            alert("로그인 후 이용해주세요.");
            nav("/login");
        } else {
            alert("게시물을 불러오지 못했습니다.");
        }
    });
  }, [userId]);

  return (
    <div className="post-grid">
      {posts.length === 0 ? 
        <div className="no-posts">
            게시물 없음
        </div>
      :
        posts.map(post => (
            <div key={post.postId} className="post-item">
            <img src={post.imageSourcesList?.[0]} alt="" />
            </div>
        ))
      }
    </div>
  );
}

export default UserPostGrid;
