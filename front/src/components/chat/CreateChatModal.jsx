import React from "react";
import * as S from "./CreateChatModal.Style.js";
const { Overlay, Modal, Title, Row, FileInputRow, Preview, Controls, Button, Label, TextInput, TextArea, RowInline } =
  S;

export default function CreateChatModal({ onClose, onCreate }) {
  const [name, setName] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const [isPublic, setIsPublic] = React.useState(true);
  const [requirePassword, setRequirePassword] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
    return () => {
      // nothing
    };
  }, [file]);

  function handleFileChange(e) {
    const f = e.target.files && e.target.files[0];
    if (f) setFile(f);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) {
      alert("채팅방 이름을 입력해주세요.");
      return;
    }
    if (requirePassword && !password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    const newRoom = {
      id: `${Date.now()}`,
      name: name.trim(),
      membersCount: 1,
      hasUnread: false,
      imagePreview: preview, // UI 전용
      isPublic,
      password: requirePassword ? password : null,
      description,
    };

    onCreate(newRoom);
    onClose();
  }

  return (
    <Overlay onMouseDown={onClose}>
      <Modal onMouseDown={(e) => e.stopPropagation()}>
        <Title>새 채팅방 만들기</Title>

        <form onSubmit={handleSubmit}>
          <Row>
            <Label>채팅방 이름</Label>
            <TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="예: 프론트엔드 스터디" />
          </Row>

          <Row>
            <Label>채팅방 표시 이미지 (선택)</Label>
            <FileInputRow>
              <Preview bg="#374151">
                {preview ? <img src={preview} alt="preview" /> : name ? name.charAt(0) : "이미지"}
              </Preview>
              <div>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 6 }}>
                  이미지를 선택하지 않으면 자동 색상/이니셜로 표시됩니다.
                </div>
              </div>
            </FileInputRow>
          </Row>

          <RowInline style={{ marginBottom: 12 }}>
            <Row style={{ margin: 0 }}>
              <Label>공개 여부</Label>
              <div>
                <label style={{ color: "#cbd5e1", marginRight: 12 }}>
                  <input type="radio" name="pub" checked={isPublic} onChange={() => setIsPublic(true)} /> 공개
                </label>
                <label style={{ color: "#cbd5e1" }}>
                  <input type="radio" name="pub" checked={!isPublic} onChange={() => setIsPublic(false)} /> 비공개
                </label>
              </div>
            </Row>

            <Row style={{ margin: 0 }}>
              <Label>비밀번호 설정</Label>
              <div>
                <label style={{ color: "#cbd5e1" }}>
                  <input
                    type="checkbox"
                    checked={requirePassword}
                    onChange={(e) => setRequirePassword(e.target.checked)}
                  />{" "}
                  비밀번호 사용
                </label>
              </div>
            </Row>
          </RowInline>

          {requirePassword && (
            <Row>
              <Label>비밀번호</Label>
              <TextInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
              />
            </Row>
          )}

          <Row>
            <Label>설명 (선택)</Label>
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="채팅방 설명을 입력하세요."
            />
          </Row>

          <Controls>
            <Button type="button" onClick={onClose}>
              취소
            </Button>
            <Button primary type="submit">
              생성
            </Button>
          </Controls>
        </form>
      </Modal>
    </Overlay>
  );
}
