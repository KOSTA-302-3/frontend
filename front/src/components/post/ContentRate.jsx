import React, { useState } from "react";
import { Button, Col, InputNumber, Row, Slider, Space } from "antd";
const IntegerStep = () => {
  const [inputValue, setInputValue] = useState(1);
  const onChange = (newValue) => {
    setInputValue(newValue);
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
        <p
          style={{
            fontSize: "20px",
            marginLeft: "150px",
            marginTop: "3px",
            fontFamily: "-apple-system",
          }}
        >
          {inputValue}
        </p>
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
