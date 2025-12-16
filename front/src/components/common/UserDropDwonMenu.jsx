import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Modal } from "antd";
import ContentRate from "../post/ContentRate";

const UserDropDwonMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMenuClick = (e) => {
    console.log("클릭된 키:", e.key);

    if (e.key === "3") {
      setIsModalOpen(true);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const items = [
    {
      label: "모든 게시물 보기",
      key: "0",
    },
    {
      label: "팔로우 게시물 보기",
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "컨텐츠 레벨 필터",
      key: "3",
    },
  ];

  return (
    <>
      <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]}>
        <Space style={{ cursor: "pointer" }}>
          <DownOutlined />
        </Space>
      </Dropdown>

      <Modal
        title="컨텐츠 레벨 설정"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleCancel}
        footer={null}
        style={{ opacity: "95%" }}
      >
        <ContentRate />
      </Modal>
    </>
  );
};

export default UserDropDwonMenu;
