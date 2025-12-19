import React, { useState } from "react";
import { Button, Col, InputNumber, Row, Slider, Space } from "antd";
import { Rate } from "./ContentRate.style";
import { setLevel } from "../../store/slices/postSlice";
import { useDispatch } from "react-redux";

const IntegerStep = () => {
  const [inputValue, setInputValue] = useState(1);
  const dispatch = useDispatch();
  const onChange = (newValue) => {
    setInputValue(newValue);
    dispatch(setLevel(newValue));
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
      </Col>
    </Row>
  );
};
const ContentRate = () => (
  <Space style={{ width: "100%" }} vertical>
    <IntegerStep />
  </Space>
);
export default ContentRate;
