import React, { useState, useRef } from "react";
import * as S from "./ChatInput.Style.js";
const { Wrap, Textarea, SendBtn, FileLabel, FilesPreview, FileChip } = S;

/**
 * ChatInput
 * props:
 * - onSend(text, files): function called when user sends (text: string, files: File[])
 * - placeholder?: string
 * - disabled?: boolean
 *
 * UX:
 * - Enter: 전송
 * - Shift+Enter: 줄바꿈
 * - 파일선택 버튼 (input[type=file]) — 선택된 파일들은 간단한 리스트로 표시(선택취소 가능)
 */

export default function ChatInput({ onSend, placeholder = "메시지를 입력하세요", disabled = false }) {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const fileRef = useRef(null);

  function handleFileChange(e) {
    const list = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...list]);
    // reset input to allow same-file reselect
    e.target.value = "";
  }

  function removeFile(idx) {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (disabled) return;
    const trimmed = text.trim();
    if (!trimmed && files.length === 0) return;
    onSend && onSend(trimmed, files);
    setText("");
    setFiles([]);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  return (
    <Wrap onSubmit={handleSubmit} aria-label="chat input">
      <FileLabel title="파일 추가">
        📎
        <input ref={fileRef} type="file" style={{ display: "none" }} onChange={handleFileChange} multiple />
      </FileLabel>

      <Textarea
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="메시지 입력"
        disabled={disabled}
      />

      <SendBtn type="submit" disabled={disabled || (!text.trim() && files.length === 0)} aria-label="전송">
        전송
      </SendBtn>

      <FilesPreview>
        {files.map((f, i) => (
          <FileChip key={i}>
            <span style={{ maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {f.name}
            </span>
            <button
              type="button"
              onClick={() => removeFile(i)}
              style={{ background: "transparent", border: 0, cursor: "pointer" }}
            >
              ✕
            </button>
          </FileChip>
        ))}
      </FilesPreview>
    </Wrap>
  );
}
