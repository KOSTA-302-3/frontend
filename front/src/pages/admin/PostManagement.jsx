import { useState, useEffect } from "react";
import { message, Modal, Carousel } from "antd";
import axiosInstance from "../../api/axiosInstance";
import SearchBar from "../../components/common/SearchBar";
import AppButton from "../../components/common/AppButton";
import Loading from "../../components/common/Loading";
import { 
  Container, 
  Header, 
  Title, 
  SearchWrapper, 
  Table, 
  TableHeader, 
  TableRow, 
  PostImage, 
  ButtonWrapper,
  Pagination,
  PageButton
} from "./PostManagement.styles";

const PostManagement = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`api/admin/posts/${currentPage}`);
      setPosts(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("게시물 조회 실패:", error);
      message.error("게시물을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("정말 이 게시물을 삭제하시겠습니까?")) return;
    
    try {
      await axiosInstance.delete(`api/admin/posts/${postId}`);
      message.success("게시물이 삭제되었습니다.");
      fetchPosts();
    } catch (error) {
      console.error("게시물 삭제 실패:", error);
      message.error("게시물 삭제에 실패했습니다.");
    }
  };

  if (loading) return <Loading />;

  return (
    <Container>
      <Header>
        <Title>게시물 관리</Title>
        <SearchWrapper>
          <SearchBar />
        </SearchWrapper>
      </Header>

      <Table>
        <TableHeader>
          <div>작성자</div>
          <div>내용</div>
          <div>관리</div>
        </TableHeader>
        {posts.map(post => (
          <TableRow key={post.postId} onClick={() => handlePostClick(post)} style={{ cursor: 'pointer' }}>
            <div>{post.createUserName}</div>
            <div>{post.content}</div>
            <ButtonWrapper>
              <AppButton onClick={(e) => { e.stopPropagation(); handleDelete(post.postId); }}>삭제</AppButton>
            </ButtonWrapper>
          </TableRow>
        ))}
      </Table>

      <Pagination>
        <PageButton 
          onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
          disabled={currentPage === 0}
        >
          이전
        </PageButton>
        <span>{currentPage + 1} / {totalPages || 1}</span>
        <PageButton 
          onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
          disabled={currentPage >= totalPages - 1}
        >
          다음
        </PageButton>
      </Pagination>

      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={800}
        centered
      >
        {selectedPost && (
          <div style={{ padding: '20px' }}>
            <h2 style={{ marginBottom: '20px', color: '#667eea' }}>게시글 상세</h2>
            
            {selectedPost.imageSourcesList && selectedPost.imageSourcesList.length > 0 && (
              <Carousel arrows draggable style={{ marginBottom: '20px', backgroundColor: '#f0f2f5', borderRadius: '8px' }}>
                {selectedPost.imageSourcesList.map((url, index) => (
                  <div key={index}>
                    <div style={{ height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#000' }}>
                      <img
                        src={url}
                        alt={`image-${index}`}
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                ))}
              </Carousel>
            )}

            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#495057' }}>작성자:</strong> {selectedPost.createUserName}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#495057' }}>내용:</strong> {selectedPost.content}
            </div>
            <div style={{ marginBottom: '15px' }}>
              <strong style={{ color: '#495057' }}>이미지 개수:</strong> {selectedPost.imageSourcesList?.length || 0}개
            </div>
          </div>
        )}
      </Modal>
    </Container>
  );
};

export default PostManagement;
