import { useState } from "react";
import { Modal, Input, Slider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../api/axiosInstance";
import { updateUser } from "../../store/slices/authSlice";
import { CancelButton, CloseButton, ConfirmButton, ModalContent, ModalFooter, ModalHeader, ModalTitle, StyledInputWrapper, StyledModal } from "./ProfileEditModal.styles";

function ProfileEditModal({ open, editType, onClose }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [tempValue, setTempValue] = useState(user[editType]);

  if (!open || !editType || !user) return null;

  const handleConfirm = () => {
    const payload = {
      username: user.username,
      profileImage: user.profileImage,
      description: user.description,
      level: user.level,
      password: user.password,
    };

    payload[editType] = tempValue;

    axiosInstance({
      url: "/api/user",
      method: "PUT",
      data: payload,
    })
      .then((res) => {
        dispatch(updateUser(res.data));
        onClose();
      })
      .catch(() => {
        alert("수정 실패");
      });
  };

  return (
    <StyledModal
  open={open}
  footer={null}
  closable={false}
  onCancel={onClose}
>
  {/* Header */}
  <ModalHeader>
    <ModalTitle>
      {editType === "username" && "아이디 수정"}
      {editType === "description" && "소개 수정"}
      {editType === "level" && "레벨 설정"}
    </ModalTitle>
    <CloseButton onClick={onClose}>✕</CloseButton>
  </ModalHeader>

  {/* Content */}
  <ModalContent>
    <StyledInputWrapper>
      {editType === "username" && (
        <Input value={tempValue} onChange={(e) => setTempValue(e.target.value)} />
      )}

      {editType === "description" && (
        <Input.TextArea
          rows={3}
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
        />
      )}

      {editType === "level" && (
        <Slider min={1} max={10} value={tempValue} onChange={setTempValue} />
      )}
    </StyledInputWrapper>
  </ModalContent>

  {/* Footer */}
  <ModalFooter>
    <CancelButton onClick={onClose}>취소</CancelButton>
    <ConfirmButton onClick={handleConfirm}>
      확인
    </ConfirmButton>
  </ModalFooter>
</StyledModal>

  );
}

export default ProfileEditModal;
