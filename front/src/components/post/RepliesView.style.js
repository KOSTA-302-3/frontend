import { Modal } from "antd";
import styled from "styled-components";

export const ModalWrapper = styled(Modal)`

  &&& {
    position: absolute;
    top: auto !important; // Antd 기본 top 무시
    bottom: 0 !important; // 바닥 고정
    margin: 0 !important;
    padding-bottom: 0 !important;
    max-width: 100% !important;
    width: 100% !important;
   
  }

  .ant-modal-container{
    background-color:#130016;
    max-height : 70vh;
    display: flex;
    overflow-y : auto;
    flex-direction: column;
    height : 50vh;
  



  }

.ant-modal-close{


}

  // 3. 헤더 디자인
  .ant-modal-header {
    background-color: black;
    border-bottom: 1px solid #333;
    border-radius: 0px 0px 0 0;
    margin-bottom: 0; // 헤더와 바디 사이 여백 제거
    flex-shrink: 0; // 헤더 크기 고정
  }

  .ant-modal-title,
  .ant-modal-close {
color: white !important;
  }

  // 4. 모달 본문 (Body) 스크롤 처리
  // .ant-modal-body는 content 안에 있는 실제 내용 영역입니다.
  .ant-modal-body {
    flex: 1;
    overflow-y: auto;
    padding: 0;
    border-radius: 0px;
    max-height : 10px

    // 스크롤바 커스텀 (선택사항 - 검정 배경에 맞게)
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #555;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
      background-color: #222;
    }
  }
`;
