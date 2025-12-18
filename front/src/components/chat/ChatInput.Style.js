import styled from "styled-components";

export const Wrap = styled.form`
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid #eee;
  align-items: center;
  background: #fff;
`;

export const FileLabel = styled.label`
  background: #f5f5f7;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  user-select: none;
`;

export const Textarea = styled.textarea`
  flex: 1;
  min-height: 40px;
  max-height: 140px;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #e6e6e9;
  font-size: 14px;
  resize: none;
`;

export const SendBtn = styled.button`
  background: #1890ff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const FilesPreview = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;
  margin-left: 8px;
`;

export const FileChip = styled.div`
  background: #f0f0f2;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 12px;
  display: flex;
  gap: 6px;
  align-items: center;
`;
