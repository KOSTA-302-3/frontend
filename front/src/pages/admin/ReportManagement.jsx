import { useState } from "react";
import styled from "styled-components";
import AppButton from "../../components/common/AppButton";

const Container = styled.div`
  padding: 3vh 3vw;
  display: flex;
  flex-direction: column;
  gap: 3vh;
`;

const Title = styled.h1`
  font-size: 3vh;
  font-weight: bold;
  color: #333;
`;

const Table = styled.div`
  background: white;
  border-radius: 2vh;
  box-shadow: 0 0.2vh 1vh rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 3fr 2fr 2fr;
  padding: 2vh 2vw;
  background: #f5f5f5;
  font-weight: bold;
  color: #333;
  font-size: 1.8vh;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 3fr 2fr 2fr;
  padding: 2vh 2vw;
  border-bottom: 0.1vh solid #f0f0f0;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #fafafa;
  }
`;

const StatusBadge = styled.span`
  padding: 0.5vh 1vw;
  border-radius: 1vh;
  font-size: 1.5vh;
  background: ${props => {
    if (props.$status === "pending") return '#fff7e6';
    if (props.$status === "approved") return '#d4edda';
    return '#f8d7da';
  }};
  color: ${props => {
    if (props.$status === "pending") return '#d46b08';
    if (props.$status === "approved") return '#155724';
    return '#721c24';
  }};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1vw;
`;

const ButtonWrapper = styled.div`
  width: 8vw;
`;

const ReportManagement = () => {
  const [reports] = useState([
    { id: 1, reporter: "고건우", target: "성지훈", reason: "부적절한 콘텐츠", date: "2024-12-05", status: "pending" },
    { id: 2, reporter: "윤석용", target: "성지훈", reason: "공갈협박", date: "2024-12-04", status: "pending" },
    { id: 3, reporter: "성지훈", target: "윤석용", reason: "살해협박", date: "2024-12-03", status: "approved" },
  ]);

  const handleApprove = (reportId) => {
    console.log("승인:", reportId);
  };

  const handleReject = (reportId) => {
    console.log("거절:", reportId);
  };

  return (
    <Container>
      <Title>신고 관리</Title>

      <Table>
        <TableHeader>
          <div>신고자</div>
          <div>대상</div>
          <div>사유</div>
          <div>상태</div>
          <div>관리</div>
        </TableHeader>
        {reports.map(report => (
          <TableRow key={report.id}>
            <div>{report.reporter}</div>
            <div>{report.target}</div>
            <div>{report.reason}</div>
            <div>
              <StatusBadge $status={report.status}>
                {report.status === "pending" ? "대기중" : report.status === "approved" ? "승인됨" : "거절됨"}
              </StatusBadge>
            </div>
            <ActionButtons>
              {report.status === "pending" && (
                <>
                  <ButtonWrapper>
                    <AppButton onClick={() => handleApprove(report.id)}>승인</AppButton>
                  </ButtonWrapper>
                  <ButtonWrapper>
                    <AppButton onClick={() => handleReject(report.id)}>거절</AppButton>
                  </ButtonWrapper>
                </>
              )}
            </ActionButtons>
          </TableRow>
        ))}
      </Table>
    </Container>
  );
};

export default ReportManagement;
