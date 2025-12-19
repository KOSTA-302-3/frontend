import React, { useState } from "react";
import { Button, Col, InputNumber, Row, Slider, Space } from "antd";
import { Rate } from "./ContentRate.style";

const IntegerStep = ({ rateChange }) => {
  const [inputValue, setInputValue] = useState(1);

  const onChange = (newValue) => {
    setInputValue(newValue);
    rateChange(newValue);
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
const ContentRate = ({ rateChange }) => (
  <Space style={{ width: "100%" }} vertical>
    <IntegerStep rateChange={rateChange} />
  </Space>
);
export default ContentRate;
