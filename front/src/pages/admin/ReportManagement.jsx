import { useState } from "react";
import AppButton from "../../components/common/AppButton";
import { 
  Container, 
  Title, 
  Table, 
  TableHeader, 
  TableRow, 
  StatusBadge, 
  ActionButtons, 
  ButtonWrapper 
} from "./ReportManagement.styles";

const ReportManagement = () => {
  const [reports] = useState([
    { id: 1, reporter: "user1", target: "santa_user", reason: "부적절한 콘텐츠", date: "2024-12-05", status: "pending" },
    { id: 2, reporter: "user2", target: "test_user", reason: "스팸", date: "2024-12-04", status: "pending" },
    { id: 3, reporter: "user3", target: "user123", reason: "욕설", date: "2024-12-03", status: "approved" },
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
