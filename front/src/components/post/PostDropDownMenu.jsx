import React from "react";
import { DownOutlined, SettingOutlined } from "@ant-design/icons";
import { Dropdown, Space, message } from "antd";

import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const PostDropDownMenu = ({
  postId,
  uploadedImages,
  content,
  visibleCheck,
}) => {
  const items = [
    {
      key: "1",
      label: "수정하기",
    },
    {
      type: "divider",
    },

    {
      key: "2",
      label: "삭제하기",
    },
  ];
  const navigate = useNavigate();
  const onClick = (e) => {
    switch (Number(e.key)) {
      case 1:
        console.log(postId);
        if (confirm("수정하시겟습니까?")) {
          navigate("/write", {
            state: {
              uploadedImages: uploadedImages,
              contentValue: content,
              visibleCheck: visibleCheck,
              method: 2,
              postId: postId,
            },
          });
        }

        break;
      case 2:
        if (confirm("삭제 하시겟습니까?")) {
          try {
            axiosInstance.delete("/api/posts/deletePosts", {
              data: {
                postId: postId,
                createUserName: "string",
                createAt: "2025-12-23T03:33:05.679Z",
                content: "string",
                likeCount: 0,
                postLevel: 0,
                contentVisible: true,
                hashTagsList: ["string"],
                imageSourcesList: ["string"],
              },
              withCredentials: true,
            });

            message.success("삭제되었습니다.");

            window.location.reload();
          } catch (e) {
            message.error("삭제에 실패했습니다 다시 시도해주세요");
            console.log(e);
          }
        }
        break;
    }
  };
  return (
    <Dropdown menu={{ items, onClick: onClick }} trigger={["click"]}>
      <Space style={{ cursor: "pointer" }}>
        <DownOutlined style={{ color: "white", fontSize: "30px" }} />
      </Space>
    </Dropdown>
  );
};
export default PostDropDownMenu;
