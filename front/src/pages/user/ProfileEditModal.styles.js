import styled from "styled-components";
import { Modal } from "antd";

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 3.7vw;
    padding: 0;
  }

  .ant-modal-body {
    padding: 0;
  }
`;

/* Header */
export const ModalHeader = styled.div`
  position: relative;
  padding: 5vw 6.5vw;
  border-bottom: 1px solid #e5e5e5;
`;

export const ModalTitle = styled.h3`
  margin: 0;
  font-size: 4.3vw;
  font-weight: 600;
  color: var(--color-text-black);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 4.3vw;
  right: 4.8vw;
  background: none;
  border: none;
  font-size: 4.8vw;
  color: #999;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;

/* Content */
export const ModalContent = styled.div`
  padding: 5.3vw 6.5vw;
`;

/* Input */
export const StyledInputWrapper = styled.div`
  .ant-input,
  .ant-input-textarea {
    color: var(--color-text-black);
    border-radius: 2vw;
  }

  .ant-input::placeholder,
  .ant-input-textarea::placeholder {
    color: #999;
  }

  .ant-input:focus,
  .ant-input-textarea:focus {
    border-color: var(--color-point);
    box-shadow: none;
  }
`;

/* Footer */
export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 2.7vw;
  padding: 4.3vw 6.5vw;
`;

/* Buttons */
export const CancelButton = styled.button`
  border: none;
  border-radius: 2.7vw;
  padding: 2vw 4.3vw;
  cursor: pointer;
`;

export const ConfirmButton = styled.button`
  background-color: var(--color-point);
  color: var(--color-text-black);
  border: none;
  border-radius: 2.7vw;
  padding: 2vw 4.8vw;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: var(--color-point-hover);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;
