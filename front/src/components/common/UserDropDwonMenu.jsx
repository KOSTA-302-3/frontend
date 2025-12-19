import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Modal } from "antd";
import ContentRate from "../post/ContentRate";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLevel, setLayer } from "../../store/slices/postSlice";

const UserDropDwonMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMenuClick = (e) => {
    let no = e.key;
    console.log("클릭된 키:", no);

    switch (Number(no)) {
      case 0:
        dispatch(setLayer(0));
        navigate("/main");
        break;

      case 1:
        dispatch(setLayer(1));
        navigate("/main");
        break;

      case 2:
        setIsModalOpen(true);
        navigate("/main");
        break;

      case 3:
        dispatch(setLevel(10));
        navigate("/main");

        break;
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
      key: "2",
    },
    {
      label: "필터Off",
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
