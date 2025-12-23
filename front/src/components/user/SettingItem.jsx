import './SettingItem.css';

function SettingItem({ title, desc, onClick }) {
  return (
    <div className="setting-item" onClick={onClick}>
      <div>
        <div className="setting-title">{title}</div>
        {desc && <div className="setting-desc">{desc}</div>}
      </div>
      <span className="arrow">›</span>
    </div>
  );
}

export default SettingItem;
