import React, { useState } from "react";
import { Button, Col, InputNumber, Row, Slider, Space, message } from "antd";
import { Rate } from "./FeedBackRate.style";
import axiosInstance from "../../api/axiosInstance";

const IntegerStep = ({ postId }) => {
  const [inputValue, setInputValue] = useState(1);

  const onChange = (newValue) => {
    setInputValue(newValue);
  };

  const sendFeedBack = async () => {
    try {
      await axiosInstance.post(
        "/api/posts/createFeedBacks",
        {
          feedBackId: 0,
          userId: 0,
          postId: postId,
          level: inputValue,
          createAt: "2025-12-29T01:32:30.603Z",
        },
        { withCredentials: true }
      );

      message.success("피드백이 성공적으로 처리되었습니다!");
    } catch (e) {
      console.error(e);
      message.error("피드백 처리에 실패했습니다.");
    }
  };

  return (
    <Row>
      <Col span={20}>
        <Slider
          min={1}
          max={10}
          onChange={onChange}
          value={typeof inputValue === "number" ? inputValue : 0}
          dots={true}
        />
      </Col>
      <Col span={12}>
        <Rate>{inputValue}</Rate>
        <Button onClick={sendFeedBack}>전송</Button>
      </Col>
    </Row>
  );
};
const FeedBackRate = ({ postId }) => (
  <Space style={{ width: "100%" }} vertical>
    <IntegerStep postId={postId} />
  </Space>
);
export default FeedBackRate;
