import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Modal, message } from "antd";
import ContentRate from "../post/ContentRate";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLevel, setLayer } from "../../store/slices/postSlice";

const UserDropDwonMenu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rate, setRate] = useState(1);

  const handleMenuClick = (e) => {
    let no = e.key;

    switch (Number(no)) {
      case 0:
        message.success("현재 모든 유저 게시물을 볼수있습니다.");
        dispatch(setLayer(0));
        navigate("/");
        break;

      case 1:
        message.success("현재 팔로우한 유저 게시물을 볼수있습니다.");
        dispatch(setLayer(1));
        navigate("/");
        break;

      case 2:
        setIsModalOpen(true);
        navigate("/");
        break;

      case 3:
        message.success("현재 필터 Off상태입니다.");
        dispatch(setLevel(10));
        navigate("/");

        break;
    }
  };

  const handleCancel = () => {
    message.success("필터가 적용되었습니다.");
    setIsModalOpen(false);
    dispatch(setLevel(rate));
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
        <ContentRate rateChange={setRate} />
      </Modal>
    </>
  );
};

export default UserDropDwonMenu;
