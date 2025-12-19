import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const Modal = styled.div`
  width: 520px;
  max-width: calc(100% - 32px);
  background: #0b0b0b;
  border-radius: 12px;
  padding: 18px;
  color: #e5e7eb;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.6);
`;

export const Title = styled.h3`
  margin: 0 0 12px 0;
  font-size: 18px;
  color: #fff;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
  margin: 0;
`;

export const Label = styled.label`
  font-size: 13px;
  color: #cbd5e1;
`;

export const TextInput = styled.input`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  color: #e5e7eb;
  padding: 8px 10px;
  border-radius: 8px;
`;

export const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.04);
  color: #e5e7eb;
  padding: 8px 10px;
  border-radius: 8px;
  min-height: 80px;
  resize: vertical;
`;

export const FileInputRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const Preview = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 8px;
  background: "#374151";
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const Controls = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 6px;
`;

export const Button = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background: ${({ $primary }) => ($primary ? "#111827" : "transparent")};
  color: ${({ $primary }) => ($primary ? "#fff" : "#cbd5e1")};
  border: 1px solid rgba(255, 255, 255, 0.04);
`;

export const RowInline = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
`;

export const FileInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FileInput = styled.input`
  font-size: 14px;
`;

export const HelpText = styled.div`
  font-size: 12px;
  color: #9ca3af;
  margin-top: 6px;
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 12px;
`;

export const RadioLabel = styled.label`
  color: #cbd5e1;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const CheckboxLabel = styled.label`
  color: #cbd5e1;
  display: flex;
  align-items: center;
  gap: 6px;
`;
