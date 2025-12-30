import React from "react";

const DevTest = () => {
  const extractHashTags = (text) => {
    if (!text) return []; // 빈 문자열이면 빈 배열 반환

    const regex = /#[\w가-힣]+/g;

    const tags = text.match(regex) || [];

    return tags;
  };

  const aa = "해스태그 테스트 #12 #123 #123123 #33333";

  return <div></div>;
};

export default DevTest;
