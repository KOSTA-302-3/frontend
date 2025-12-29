import { useState } from "react";
import { Modal, Form, Select, Input, message } from "antd";
import axiosInstance from "../../api/axiosInstance";
import { FormWrapper, NoticeBox } from "./ReportModal.styled";

const { Option } = Select;
const { TextArea } = Input;

/**
 * 신고 모달 컴포넌트
 * @param {boolean} open - 모달 열림 상태
 * @param {function} onClose - 모달 닫기 함수
 * @param {string} reportType - 신고 타입 (USER, POST, REPLY)
 * @param {number} targetId - 신고 대상 ID
 * @param {function} onSuccess - 신고 성공 콜백
 */
function ReportModal({ open, onClose, reportType, targetId, onSuccess }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const reportReasons = {
    USER: [
      { value: "스팸/광고", label: "스팸/광고" },
      { value: "욕설/비방", label: "욕설/비방" },
      { value: "성희롱/음란물", label: "성희롱/음란물" },
      { value: "사칭/사기", label: "사칭/사기" },
      { value: "기타", label: "기타" },
    ],
    POST: [
      { value: "스팸/광고", label: "스팸/광고" },
      { value: "욕설/비방", label: "욕설/비방" },
      { value: "성희롱/음란물", label: "성희롱/음란물" },
      { value: "저작권 침해", label: "저작권 침해" },
      { value: "부적절한 콘텐츠", label: "부적절한 콘텐츠" },
      { value: "기타", label: "기타" },
    ],
    REPLY: [
      { value: "스팸/광고", label: "스팸/광고" },
      { value: "욕설/비방", label: "욕설/비방" },
      { value: "성희롱/음란물", label: "성희롱/음란물" },
      { value: "기타", label: "기타" },
    ],
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const reportData = {
        reportType: reportType,
        targetId: targetId,
        content: `${values.reason}${values.detail ? ` - ${values.detail}` : ""}`,
      };

      await axiosInstance.post("/api/report", reportData);
      
      message.success("신고가 접수되었습니다.");
      form.resetFields();
      onClose();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("신고 실패:", error);
      
      if (error.response?.status === 400) {
        message.error("12시간 이내 동일 대상 재신고는 불가능합니다.");
      } else if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error("신고 접수에 실패했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  const getTitle = () => {
    switch (reportType) {
      case "USER":
        return "사용자 신고";
      case "POST":
        return "게시물 신고";
      case "REPLY":
        return "댓글 신고";
      default:
        return "신고하기";
    }
  };

  return (
    <Modal
      title={getTitle()}
      open={open}
      onOk={handleSubmit}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="신고"
      cancelText="취소"
      width={500}
    >
      <FormWrapper>
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
          name="reason"
          label="신고 사유"
          rules={[{ required: true, message: "신고 사유를 선택해주세요" }]}
        >
          <Select placeholder="신고 사유를 선택해주세요">
            {reportReasons[reportType]?.map((reason) => (
              <Option key={reason.value} value={reason.value}>
                {reason.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="detail"
          label="상세 내용 (선택)"
        >
          <TextArea
            rows={4}
            placeholder="신고 사유에 대한 상세 내용을 입력해주세요 (선택사항)"
            maxLength={500}
            showCount
          />
        </Form.Item>

        <NoticeBox>
          <div>• 허위 신고 시 제재를 받을 수 있습니다.</div>
          <div>• 동일 대상에 대한 재신고는 12시간 후 가능합니다.</div>
          <div>• 신고 내용은 관리자가 검토 후 처리됩니다.</div>
        </NoticeBox>
        </Form>
      </FormWrapper>
    </Modal>
  );
}

export default ReportModal;
