import { Outlet, useNavigate } from "react-router-dom";
import "./SettingsPage.css";
import SettingItem from "../../components/user/SettingItem";
import SettingToggle from "../../components/user/SettingToggle";
import axiosInstance from "../../api/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { updatePrivacy } from "../../store/slices/authSlice";

function SettingsPage() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.auth.user);

  const togglePrivate = () => {
    axiosInstance({
      url: "/api/user/privacy",
      method: "PUT",
    })
      .then((res) => {
        dispatch(updatePrivacy(res.data.isPrivate));
      })
      .catch(() => {
        alert("비공개 전환 실패");
      });
  };

  const withdraw = () => {
    if (!confirm("정말 탈퇴하시겠어요? 되돌릴 수 없습니다.")) return;

    axiosInstance({
      url: "/api/user/softdelete",
      method: "DELETE",
    })
      .then((res) => {
        nav("/login");
      })
      .catch(() => {
        alert("탈퇴 실패");
      });
  };

  const logout = () => {
    axiosInstance({
      url: "/api/logout",
      method: "post",
    }).finally(() => {
      nav("/login");
    });
  };

  return (
    <div className="settings-page">
      {/* <h2 className="settings-title">설정</h2> */}

      {/* 계정 */}
      <div className="settings-section">
        <div className="section-title">계정</div>

        <SettingItem title="프로필 수정" onClick={() => nav("/settings/profile")} />

        <SettingToggle
          title="비공개 계정"
          desc="승인된 팔로워만 게시물을 볼 수 있습니다"
          checked={loginUser.isPrivate}
          onChange={togglePrivate}
        />
      </div>

      {/* 커스터마이징 */}
      <div className="settings-section">
        <div className="section-title">커스터마이징</div>

        <SettingItem title="뱃지 관리" onClick={() => nav("/settings/badges")} />
      </div>

      {/* 활동 */}
      <div className="settings-section">
        <div className="section-title">활동</div>

        <SettingItem title="차단 목록" onClick={() => nav("/settings/blocks")} />
        {/* <SettingItem
          title="내 댓글"
          onClick={() => nav("/settings/comments")}
        />
        <SettingItem
          title="좋아요한 게시물"
          onClick={() => nav("/settings/likes")}
        /> */}
        <SettingItem title="로그아웃" onClick={logout} />
      </div>

      {/* 위험(탈퇴) */}
      <div className="settings-section">
        <div className="section-title">위험</div>

        <div className="danger-item" onClick={withdraw}>
          회원 탈퇴
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
