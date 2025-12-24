import { useState, useEffect } from "react";
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  ShopOutlined 
} from "@ant-design/icons";
import { Modal, Form, Input, InputNumber, Upload, message } from "antd";
import axiosInstance from "../../api/axiosInstance";
import { 
  Container, 
  Header, 
  Title, 
  HeaderActions,
  SearchInput,
  AddButton,
  BadgeGrid,
  BadgeCard,
  BadgeImage,
  BadgeInfo,
  BadgeName,
  BadgeDescription,
  BadgePrice,
  BadgeActions,
  ActionButton,
  LoadingMessage,
  EmptyMessage
} from "./BadgeManagement.styles";

const BadgeManagement = () => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBadge, setEditingBadge] = useState(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  // 뱃지 목록 불러오기
  const fetchBadges = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/api/custom/badge/0`);
      console.log("=== 백엔드 응답 전체 ===", response);
      console.log("=== 응답 타입 ===", typeof response);
      console.log("=== 응답 키들 ===", Object.keys(response));
      
      if (response.data.content) {
        console.log("=== content 배열 ===", response.data.content);
        console.log("=== 첫번째 아이템 전체 ===", response.data.content[0]);
        
        // 각 뱃지의 모든 프로퍼티 출력
        response.data.content.forEach((item, idx) => {
          console.log(`\n뱃지 ${idx} 모든 속성:`, JSON.stringify(item, null, 2));
        });
      }
      
      setBadges(response.data.content || []);
    } catch (error) {
      console.error("뱃지 목록 조회 실패:", error);
      message.error("뱃지 목록을 불러오는데 실패했습니다.");
      setBadges([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBadges();
  }, []);

  // 검색 필터링
  const filteredBadges = badges.filter(badge => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      badge.name?.toLowerCase().includes(term) ||
      badge.description?.toLowerCase().includes(term)
    );
  });

  // 모달 열기 (등록/수정)
  const handleOpenModal = (badge = null) => {
    setEditingBadge(badge);
    if (badge) {
      form.setFieldsValue({
        name: badge.name,
        description: badge.description,
        price: badge.price
      });
      if (badge.imageUrl) {
        setFileList([{
          uid: '-1',
          name: 'badge-image',
          status: 'done',
          url: badge.imageUrl,
        }]);
      }
    } else {
      form.resetFields();
      setFileList([]);
    }
    setIsModalOpen(true);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBadge(null);
    form.resetFields();
    setFileList([]);
  };

  // 뱃지 등록/수정
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log("폼 값:", values);
      
      // 이미지 처리
      let imageUrl = editingBadge?.imageUrl || '';
      if (fileList.length > 0 && fileList[0].originFileObj) {
        console.log("이미지 업로드 시작...");
        const formData = new FormData();
        formData.append('file', fileList[0].originFileObj);
        
        const uploadResponse = await axiosInstance.post('/api/admin/badge/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        imageUrl = uploadResponse.data.imageUrl;
        console.log("업로드된 이미지 URL:", imageUrl);
      }

      // 이미지가 없으면 에러
      if (!imageUrl) {
        message.error("이미지를 업로드해주세요.");
        return;
      }

      const badgeData = {
        name: values.name,
        description: values.description,
        price: values.price,
        imageUrl: imageUrl
      };
      
      console.log("전송할 뱃지 데이터:", badgeData);
      
      if (editingBadge) {
        const result = await axiosInstance.put(`/api/admin/badge/${editingBadge.badgeId}`, badgeData);
        console.log("수정 결과:", result);
        message.success("뱃지가 수정되었습니다.");
      } else {
        const result = await axiosInstance.post('/api/admin/badge', badgeData);
        console.log("등록 결과:", result);
        message.success("뱃지가 등록되었습니다.");
      }
      
      handleCloseModal();
      fetchBadges();
    } catch (error) {
      console.error("뱃지 저장 실패:", error);
      if (error.errorInfo) {
        // Form validation error
        return;
      }
      message.error("뱃지 저장에 실패했습니다.");
    }
  };

  // 뱃지 삭제
  const handleDelete = async (badgeId) => {
    Modal.confirm({
      title: '뱃지 삭제',
      content: '정말 이 뱃지를 삭제하시겠습니까?',
      okText: '삭제',
      cancelText: '취소',
      okButtonProps: { danger: true },
      onOk: async () => {
        try {
          await axiosInstance.delete(`/api/admin/badge/${badgeId}`);
          message.success("뱃지가 삭제되었습니다.");
          fetchBadges();
        } catch (error) {
          console.error("뱃지 삭제 실패:", error);
          message.error("뱃지 삭제에 실패했습니다.");
        }
      }
    });
  };

  // 이미지 업로드 설정
  const uploadProps = {
    listType: "picture-card",
    fileList: fileList,
    maxCount: 1,
    accept: "image/*",
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('이미지 파일만 업로드 가능합니다!');
        return Upload.LIST_IGNORE;
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.warning('이미지가 5MB를 초과합니다. 업로드가 느릴 수 있습니다.');
      }
      return false;
    },
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList);
    },
  };

  return (
    <Container>
      <Header>
        <Title>
          <ShopOutlined /> 뱃지 관리
        </Title>
        <HeaderActions>
          <SearchInput
            placeholder="뱃지 이름 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <AddButton onClick={() => handleOpenModal()}>
            <PlusOutlined /> 뱃지 등록
          </AddButton>
        </HeaderActions>
      </Header>

      {loading ? (
        <LoadingMessage>로딩 중...</LoadingMessage>
      ) : filteredBadges.length === 0 ? (
        <EmptyMessage>
          {searchTerm ? "검색 결과가 없습니다." : "등록된 뱃지가 없습니다."}
        </EmptyMessage>
      ) : (
        <BadgeGrid>
          {filteredBadges.map((badge, index) => (
            <BadgeCard key={badge.badgeId || `badge-${index}`}>
              <BadgeImage 
                src={badge.imageUrl || "https://placehold.co/150x150?text=No+Image"} 
                alt={badge.name || '뱃지'}
                onError={(e) => {
                  e.target.src = "https://placehold.co/150x150?text=No+Image";
                }}
              />
              <BadgeInfo>
                <BadgeName>{badge.name}</BadgeName>
                <BadgeDescription>{badge.description}</BadgeDescription>
                <BadgePrice>
                  {badge.price ? badge.price.toLocaleString() : '0'} 포인트
                </BadgePrice>
              </BadgeInfo>
              <BadgeActions>
                <ActionButton 
                  type="edit"
                  onClick={() => handleOpenModal(badge)}
                >
                  <EditOutlined /> 수정
                </ActionButton>
                <ActionButton 
                  type="delete"
                  onClick={() => handleDelete(badge.badgeId)}
                >
                  <DeleteOutlined /> 삭제
                </ActionButton>
              </BadgeActions>
            </BadgeCard>
          ))}
        </BadgeGrid>
      )}

      <Modal
        title={editingBadge ? "뱃지 수정" : "뱃지 등록"}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={handleCloseModal}
        okText={editingBadge ? "수정" : "등록"}
        cancelText="취소"
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          style={{ marginTop: 24 }}
        >
          <Form.Item
            label="뱃지 이름"
            name="name"
            rules={[
              { required: true, message: "뱃지 이름을 입력해주세요" },
              { max: 100, message: "최대 100자까지 입력 가능합니다" }
            ]}
          >
            <Input placeholder="예: 골드 배지" />
          </Form.Item>

          <Form.Item
            label="뱃지 설명"
            name="description"
            rules={[
              { required: true, message: "뱃지 설명을 입력해주세요" },
              { max: 500, message: "최대 500자까지 입력 가능합니다" }
            ]}
          >
            <Input.TextArea 
              rows={3} 
              placeholder="뱃지에 대한 설명을 입력하세요"
            />
          </Form.Item>

          <Form.Item
            label="가격 (포인트)"
            name="price"
            rules={[
              { required: true, message: "가격을 입력해주세요" },
              { type: 'number', min: 0, message: "0 이상의 숫자를 입력해주세요" }
            ]}
          >
            <InputNumber 
              style={{ width: '100%' }}
              placeholder="1000"
              min={0}
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />
          </Form.Item>

          <Form.Item
            label="뱃지 이미지"
            name="badgeImage"
          >
            <Upload {...uploadProps}>
              {fileList.length === 0 && (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>업로드</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </Container>
  );
};

export default BadgeManagement;
